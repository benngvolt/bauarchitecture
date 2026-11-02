const MissionsSettings = require('../models/missionsSettings')

const MISSION_KEYS = ['construction', 'renovation', 'extension', 'amenagements'];
const MAX_DESCRIPTION_LENGTH = 200;

function formatMissionsSettings(settings) {
  return Object.fromEntries(MISSION_KEYS.map((key) => [key, settings?.[key] || '']));
}

/*-------------------------------------
----- GET MISSIONS SETTINGS ----------
-------------------------------------*/

exports.getMissionsSettings = async (req, res) => {
  try {
    const settings = await MissionsSettings.findOne();

    res.status(200).json(formatMissionsSettings(settings));
  } catch (error) {
    res.status(400).json({ error });
  }
}

/*-------------------------------------
----- UPDATE MISSIONS SETTINGS -------
-------------------------------------*/

// Un descriptif vide rétablit le texte par défaut de la mission concernée.
exports.updateMissionsSettings = async (req, res) => {
  const updatedFields = {};

  for (const key of MISSION_KEYS) {
    const value = req.body[key];

    if (value === undefined) continue;

    if (typeof value !== 'string') {
      return res.status(400).json({ error: `Le champ "${key}" doit être un texte.` });
    }

    if (value.length > MAX_DESCRIPTION_LENGTH) {
      return res.status(400).json({ error: `Le descriptif "${key}" est trop long.` });
    }

    updatedFields[key] = value.trim();
  }

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'Aucun descriptif à mettre à jour.' });
  }

  try {
    await MissionsSettings.findOneAndUpdate(
      {},
      updatedFields,
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Descriptifs mis à jour !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des descriptifs.' });
  }
};
