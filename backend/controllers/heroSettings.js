const HeroSettings = require('../models/heroSettings')

/*----------------------------
----- GET HERO SETTINGS -----
----------------------------*/

exports.getHeroSettings = (req, res) => {
  HeroSettings.findOne()
    .then (heroSettings => res.status(200).json(heroSettings || { imageUrl: null }))
    .catch (error => res.status (400).json({error}))
}

/*-------------------------------
----- UPDATE HERO IMAGE ---------
-------------------------------*/

exports.updateHeroSettings = async (req, res, next) => {

  const newHero = req.newHeroObjects?.[0];

  if (!newHero) {
    return res.status(400).json({ error: 'Aucune image reçue dans la demande.' });
  }

  try {
    await HeroSettings.findOneAndUpdate(
      {},
      { imageUrl: newHero.imageUrl },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Image du hero mise à jour !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image du hero.' });
  }
};

/*-------------------------------
----- RESET HERO IMAGE ----------
-------------------------------*/

exports.deleteHeroSettings = async (req, res, next) => {
  try {
    await HeroSettings.deleteMany({});
    res.status(200).json({ message: 'Image du hero réinitialisée.' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation de l\'image du hero.' });
  }
};
