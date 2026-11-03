const AboutPageContent = require('../models/aboutPageContent')

/*--------------------------------------
----- GET ABOUT PAGE CONTENT ----------
--------------------------------------*/

exports.getAboutPageContent = (req, res) => {
  AboutPageContent.findOne()
    .then (content => res.status(200).json(content || {}))
    .catch (error => res.status (400).json({error}))
}

/*--------------------------------------
----- UPDATE ABOUT PAGE CONTENT --------
--------------------------------------*/

exports.updateAboutPageContent = async (req, res, next) => {

  const { philosophyText, curriculumText } = req.body;

  const newPhilosophyImage = req.newPhilosophyObjects?.[0];
  const newPortrait2 = req.newPortrait2Objects?.[0];

  const updatedFields = {};

  if (philosophyText !== undefined) updatedFields.philosophyText = philosophyText;
  if (curriculumText !== undefined) updatedFields.curriculumText = curriculumText;
  if (newPhilosophyImage) updatedFields.philosophyImageUrl = newPhilosophyImage.imageUrl;
  if (newPortrait2) updatedFields.portrait2Url = newPortrait2.imageUrl;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'Aucune donnée à mettre à jour.' });
  }

  try {
    await AboutPageContent.findOneAndUpdate(
      {},
      updatedFields,
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Page À propos mise à jour !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la page À propos.' });
  }
};

/*--------------------------------------
----- RESET PHILOSOPHY IMAGE -----------
--------------------------------------*/

exports.resetPhilosophyImage = async (req, res, next) => {
  try {
    await AboutPageContent.updateOne({}, { $unset: { philosophyImageUrl: '' } });
    res.status(200).json({ message: 'Image de la section philosophie réinitialisée.' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation de l\'image.' });
  }
};

/*--------------------------------------
----- RESET PORTRAIT 2 -----------------
--------------------------------------*/

exports.resetPortrait2 = async (req, res, next) => {
  try {
    await AboutPageContent.updateOne({}, { $unset: { portrait2Url: '' } });
    res.status(200).json({ message: 'Second portrait supprimé.' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du second portrait.' });
  }
};
