const CuriosityItem = require('../models/curiosityItem')

/*---------------------------------
----- GET ALL CURIOSITY ITEMS -----
---------------------------------*/

exports.getAllCuriosityItems = (req, res) => {
  CuriosityItem.find().sort({ order: 1 })
    .then (curiosityItems => res.status(200).json(curiosityItems))
    .catch (error => res.status (400).json({error}))
}

/*-------------------------------
----- CREATE CURIOSITY ITEM -----
-------------------------------*/

exports.createCuriosityItem = async (req, res, next) => {

  const { name, richText } = req.body;
  const newImage = req.newObjectObjects?.[0];

  if (!name || !newImage) {
    return res.status(400).json({ error: 'Le nom et la photo de l\'objet sont obligatoires.' });
  }

  try {
    const lastItem = await CuriosityItem.findOne().sort({ order: -1 });
    const order = lastItem ? lastItem.order + 1 : 0;

    await new CuriosityItem({ order, name, imageUrl: newImage.imageUrl, richText }).save();

    res.status(201).json({ message: 'Objet ajouté !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

/*-------------------------------
----- UPDATE CURIOSITY ITEM -----
-------------------------------*/

exports.updateOneCuriosityItem = async (req, res, next) => {

  try {
    const curiosityItem = await CuriosityItem.findOne({ _id: req.params.id });

    if (!curiosityItem) {
      return res.status(404).json({ error: 'Objet non trouvé' });
    }

    const { name, richText } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Le nom de l\'objet est obligatoire.' });
    }

    const updatedFields = { name, richText: richText || '' };
    const newImage = req.newObjectObjects?.[0];
    if (newImage) updatedFields.imageUrl = newImage.imageUrl;

    await CuriosityItem.updateOne({ _id: req.params.id }, updatedFields);
    res.status(200).json({ message: 'Objet modifié' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'objet.' });
  }
};

/*-------------------------------
----- REORDER CURIOSITY ITEMS ---
-------------------------------*/

// Reçoit la liste complète des identifiants dans le nouvel ordre d'affichage.
exports.reorderCuriosityItems = async (req, res) => {

  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'La liste "ids" est manquante dans la demande.' });
  }

  try {
    await CuriosityItem.bulkWrite(
      ids.map((id, index) => ({
        updateOne: { filter: { _id: id }, update: { order: index } },
      }))
    );
    res.status(200).json({ message: 'Ordre des objets mis à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'ordre des objets.' });
  }
};

/*-------------------------------
----- DELETE CURIOSITY ITEM -----
-------------------------------*/

exports.deleteOneCuriosityItem = async (req, res, next) => {
  try {
    const deletedItem = await CuriosityItem.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Objet non trouvé' });
    }
    res.status(200).json({ message: 'Objet supprimé !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'objet' });
  }
};
