const ProcessSettings = require('../models/processSettings')

const MAX_PROCESS_TITLE_LENGTH = 200;

/*-------------------------------------
----- GET PROCESS SETTINGS -----------
-------------------------------------*/

exports.getProcessSettings = async (req, res) => {
  try {
    const settings = await ProcessSettings.findOne();

    res.status(200).json({ title: settings?.title || '' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

/*-------------------------------------
----- UPDATE PROCESS SETTINGS --------
-------------------------------------*/

// Un titre vide rétablit la phrase d'accroche par défaut.
exports.updateProcessSettings = async (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string') {
    return res.status(400).json({ error: 'Le champ "title" est requis.' });
  }

  if (title.length > MAX_PROCESS_TITLE_LENGTH) {
    return res.status(400).json({ error: 'Titre trop long.' });
  }

  try {
    await ProcessSettings.findOneAndUpdate(
      {},
      { title: title.trim() },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Phrase d\'accroche des étapes mise à jour !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la phrase d\'accroche.' });
  }
};
