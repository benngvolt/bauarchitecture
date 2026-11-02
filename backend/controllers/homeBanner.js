const HomeBanner = require('../models/homeBanner')

/*-------------------------------------
----- GET HOME BANNER ----------------
-------------------------------------*/

exports.getHomeBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findOne();

    res.status(200).json({ imageUrl: banner?.imageUrl || null });
  } catch (error) {
    res.status(400).json({ error });
  }
}

/*-------------------------------------
----- UPDATE HOME BANNER -------------
-------------------------------------*/

exports.updateHomeBanner = async (req, res, next) => {
  const newBanner = req.newBannerObjects?.[0];

  if (!newBanner) {
    return res.status(400).json({ error: 'Aucune image à enregistrer.' });
  }

  try {
    await HomeBanner.findOneAndUpdate(
      {},
      { imageUrl: newBanner.imageUrl },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Image pleine largeur mise à jour !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'image pleine largeur." });
  }
};

/*-------------------------------------
----- RESET HOME BANNER --------------
-------------------------------------*/

exports.resetHomeBanner = async (req, res, next) => {
  try {
    await HomeBanner.updateOne({}, { $unset: { imageUrl: '' } });
    res.status(200).json({ message: 'Image pleine largeur réinitialisée.' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la réinitialisation de l'image pleine largeur." });
  }
};
