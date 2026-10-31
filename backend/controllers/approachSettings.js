const ApproachSettings = require('../models/approachSettings')

const MAX_APPROACH_TITLE_LENGTH = 200;
const MAX_APPROACH_ITEMS = 6;
const MAX_ITEM_TITLE_LENGTH = 120;
const MAX_ITEM_TEXT_LENGTH = 600;

function formatApproachSettings(settings) {
  return {
    title: settings?.title || '',
    items: (settings?.items || []).map((item) => ({
      title: item.title,
      text: item.text || '',
    })),
  };
}

/*-------------------------------------
----- GET APPROACH SETTINGS ----------
-------------------------------------*/

exports.getApproachSettings = async (req, res) => {
  try {
    const settings = await ApproachSettings.findOne();

    res.status(200).json(formatApproachSettings(settings));
  } catch (error) {
    res.status(400).json({ error });
  }
}

/*-------------------------------------
----- UPDATE APPROACH SETTINGS -------
-------------------------------------*/

// Un titre vide et une liste vide rétablissent les textes par défaut.
exports.updateApproachSettings = async (req, res) => {
  const { title, items } = req.body;

  if (typeof title !== 'string' || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Les champs "title" et "items" sont requis.' });
  }

  if (title.length > MAX_APPROACH_TITLE_LENGTH) {
    return res.status(400).json({ error: 'Titre trop long.' });
  }

  if (items.length > MAX_APPROACH_ITEMS) {
    return res.status(400).json({ error: `Maximum ${MAX_APPROACH_ITEMS} blocs.` });
  }

  const isValidItem = (item) =>
    item
    && typeof item.title === 'string'
    && typeof item.text === 'string'
    && item.title.trim() !== ''
    && item.title.length <= MAX_ITEM_TITLE_LENGTH
    && item.text.length <= MAX_ITEM_TEXT_LENGTH;

  if (!items.every(isValidItem)) {
    return res.status(400).json({ error: 'Chaque bloc doit avoir un titre et des textes de longueur raisonnable.' });
  }

  try {
    await ApproachSettings.findOneAndUpdate(
      {},
      {
        title: title.trim(),
        items: items.map((item) => ({ title: item.title.trim(), text: item.text.trim() })),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Section Approche mise à jour !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la section Approche.' });
  }
};
