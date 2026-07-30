const PhilosophyContent = require('../models/philosophyContent')

/*--------------------------------------
----- GET PHILOSOPHY CONTENT ----------
--------------------------------------*/

exports.getPhilosophyContent = (req, res) => {
  PhilosophyContent.findOne()
    .then (philosophyContent => res.status(200).json(philosophyContent || { text: null, imageUrl: null }))
    .catch (error => res.status (400).json({error}))
}

/*--------------------------------------
----- UPDATE PHILOSOPHY CONTENT --------
--------------------------------------*/

exports.updatePhilosophyContent = async (req, res, next) => {

  const { text } = req.body;
  const newImage = req.newPhilosophyObjects?.[0];

  if (!text) {
    return res.status(400).json({ error: 'Le champ "text" est manquant dans la demande.' });
  }

  try {
    const existing = await PhilosophyContent.findOne();

    const updatedFields = {
      text,
      ...(newImage ? { imageUrl: newImage.imageUrl } : {}),
    };

    await PhilosophyContent.findOneAndUpdate(
      {},
      updatedFields,
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Contenu de la section philosophie mis à jour !' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du contenu.' });
  }
};

/*--------------------------------------
----- RESET PHILOSOPHY IMAGE -----------
--------------------------------------*/

exports.resetPhilosophyImage = async (req, res, next) => {
  try {
    await PhilosophyContent.updateOne({}, { $unset: { imageUrl: '' } });
    res.status(200).json({ message: 'Image de la section philosophie réinitialisée.' });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation de l\'image.' });
  }
};
