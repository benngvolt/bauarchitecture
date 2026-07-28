const ReassuranceItem = require('../models/reassuranceItem')

const MAX_REASSURANCE_ITEMS = 3;

/*------------------------------------
----- GET ALL REASSURANCE ITEMS -----
------------------------------------*/

exports.getAllReassuranceItems = (req, res) => {
  ReassuranceItem.find().sort({ createdAt: 1 })
    .then (items => res.status(200).json(items))
    .catch (error => res.status (400).json({error}))
}

/*----------------------------------
----- CREATE REASSURANCE ITEM -----
----------------------------------*/

exports.createReassuranceItem = async (req, res) => {

  const { title, subtitle } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
  }

  try {
    const existingCount = await ReassuranceItem.countDocuments();
    if (existingCount >= MAX_REASSURANCE_ITEMS) {
      return res.status(400).json({ error: `Le nombre maximum de ${MAX_REASSURANCE_ITEMS} éléments de réassurance est atteint.` });
    }

    const reassuranceItem = new ReassuranceItem({ title, subtitle });
    await reassuranceItem.save();
    res.status(201).json({ message: 'Élément de réassurance enregistré !' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

/*----------------------------------
----- UPDATE REASSURANCE ITEM -----
----------------------------------*/

exports.updateOneReassuranceItem = async (req, res) => {

  try {
    const reassuranceItem = await ReassuranceItem.findOne({ _id: req.params.id });

    if (!reassuranceItem) {
      return res.status(404).json({ error: 'Élément de réassurance non trouvé' });
    }

    const { title, subtitle } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Le champ "title" est manquant dans la demande.' });
    }

    await ReassuranceItem.updateOne({ _id: req.params.id }, { title, subtitle });
    res.status(200).json({ message: 'Élément de réassurance modifié' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'élément de réassurance.' });
  }
};

/*----------------------------------
----- DELETE REASSURANCE ITEM -----
----------------------------------*/

exports.deleteOneReassuranceItem = async (req, res) => {
  try {
    const deletedItem = await ReassuranceItem.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Élément de réassurance non trouvé' });
    }
    res.status(200).json({ message: 'Élément de réassurance supprimé !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'élément de réassurance' });
  }
};
