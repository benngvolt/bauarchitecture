const mongoose = require('mongoose')
const FeaturedProjects = require('../models/featuredProjects')
const Project = require('../models/project')

const MAX_FEATURED_PROJECTS = 3;

/*-------------------------------------
----- GET FEATURED PROJECTS ----------
-------------------------------------*/

exports.getFeaturedProjects = async (req, res) => {
  try {
    const featuredProjects = await FeaturedProjects.findOne();

    res.status(200).json({
      projectIds: (featuredProjects?.projectIds || []).map(String),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

/*-------------------------------------
----- UPDATE FEATURED PROJECTS -------
-------------------------------------*/

exports.updateFeaturedProjects = async (req, res) => {
  const { projectIds } = req.body;

  if (!Array.isArray(projectIds)) {
    return res.status(400).json({ error: 'Le champ "projectIds" est manquant dans la demande.' });
  }

  const ids = projectIds.map(String);

  if (ids.length > MAX_FEATURED_PROJECTS) {
    return res.status(400).json({ error: `Maximum ${MAX_FEATURED_PROJECTS} projets à la une.` });
  }

  if (new Set(ids).size !== ids.length) {
    return res.status(400).json({ error: 'Un même projet ne peut pas être choisi deux fois.' });
  }

  if (!ids.every((id) => mongoose.isValidObjectId(id))) {
    return res.status(400).json({ error: 'Identifiant de projet invalide.' });
  }

  try {
    const existingCount = await Project.countDocuments({ _id: { $in: ids } });

    if (existingCount !== ids.length) {
      return res.status(400).json({ error: 'Un des projets choisis n\'existe pas.' });
    }

    await FeaturedProjects.findOneAndUpdate(
      {},
      { projectIds: ids },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Projets à la une mis à jour !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des projets à la une.' });
  }
};
