const FriendUrl = require('../models/friendUrl')

/*------------------------------
----- GET ALL FRIEND URLS ------
------------------------------*/

exports.getAllFriendUrls = (req, res) => {
  FriendUrl.find().sort({ createdAt: 1 })
    .then (friendUrls => res.status(200).json(friendUrls))
    .catch (error => res.status (400).json({error}))
}

/*----------------------------
----- CREATE FRIEND URL ------
----------------------------*/

exports.createFriendUrl = async (req, res) => {

  const { itemName, itemUrl } = req.body;

  if (!itemName || !itemUrl) {
    return res.status(400).json({ error: 'Le champ "itemName" ou "itemUrl" est manquant dans la demande.' });
  }

  try {
    const friendUrl = new FriendUrl({ itemName, itemUrl });
    await friendUrl.save();
    res.status(201).json({ message: 'Lien ajouté !' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

/*----------------------------
----- UPDATE FRIEND URL ------
----------------------------*/

exports.updateOneFriendUrl = async (req, res) => {

  try {
    const friendUrl = await FriendUrl.findOne({ _id: req.params.id });

    if (!friendUrl) {
      return res.status(404).json({ error: 'Lien non trouvé' });
    }

    const { itemName, itemUrl } = req.body;

    if (!itemName || !itemUrl) {
      return res.status(400).json({ error: 'Le champ "itemName" ou "itemUrl" est manquant dans la demande.' });
    }

    await FriendUrl.updateOne({ _id: req.params.id }, { itemName, itemUrl });
    res.status(200).json({ message: 'Lien modifié' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du lien.' });
  }
};

/*----------------------------
----- DELETE FRIEND URL ------
----------------------------*/

exports.deleteOneFriendUrl = async (req, res) => {
  try {
    const deletedFriendUrl = await FriendUrl.findOneAndDelete({ _id: req.params.id });
    if (!deletedFriendUrl) {
      return res.status(404).json({ message: 'Lien non trouvé' });
    }
    res.status(200).json({ message: 'Lien supprimé !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du lien' });
  }
};
