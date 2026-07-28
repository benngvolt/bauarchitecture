const ProcessStep = require('../models/processStep')

/*--------------------------------
----- GET ALL PROCESS STEPS ------
--------------------------------*/

exports.getAllProcessSteps = (req, res) => {
  ProcessStep.find().sort({ order: 1 })
    .then (processSteps => res.status(200).json(processSteps))
    .catch (error => res.status (400).json({error}))
}

/*--------------------------------
----- UPDATE PROCESS STEP --------
--------------------------------*/

exports.updateOneProcessStep = async (req, res) => {

  try {
    const processStep = await ProcessStep.findOne({ _id: req.params.id });

    if (!processStep) {
      return res.status(404).json({ error: 'Étape du processus non trouvée' });
    }

    const { title, tagline, richText } = req.body;

    if (!title || !tagline) {
      return res.status(400).json({ error: 'Le champ "title" ou "tagline" est manquant dans la demande.' });
    }

    await ProcessStep.updateOne({ _id: req.params.id }, { title, tagline, richText });
    res.status(200).json({ message: 'Étape du processus modifiée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'étape du processus.' });
  }
};
