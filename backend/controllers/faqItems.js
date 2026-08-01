const FaqItem = require('../models/faqItem')

/*------------------------------
----- GET ALL FAQ ITEMS -------
------------------------------*/

exports.getAllFaqItems = (req, res) => {
  FaqItem.find().sort({ createdAt: 1 })
    .then (faqItems => res.status(200).json(faqItems))
    .catch (error => res.status (400).json({error}))
}

/*------------------------------
----- CREATE FAQ ITEM ----------
------------------------------*/

exports.createFaqItem = async (req, res) => {

  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Le champ "question" ou "answer" est manquant dans la demande.' });
  }

  try {
    const faqItem = new FaqItem({ question, answer });
    await faqItem.save();
    res.status(201).json({ message: 'Question ajoutée !' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

/*------------------------------
----- UPDATE FAQ ITEM ----------
------------------------------*/

exports.updateOneFaqItem = async (req, res) => {

  try {
    const faqItem = await FaqItem.findOne({ _id: req.params.id });

    if (!faqItem) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Le champ "question" ou "answer" est manquant dans la demande.' });
    }

    await FaqItem.updateOne({ _id: req.params.id }, { question, answer });
    res.status(200).json({ message: 'Question modifiée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la question.' });
  }
};

/*------------------------------
----- DELETE FAQ ITEM ----------
------------------------------*/

exports.deleteOneFaqItem = async (req, res) => {
  try {
    const deletedItem = await FaqItem.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.status(200).json({ message: 'Question supprimée !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la question' });
  }
};
