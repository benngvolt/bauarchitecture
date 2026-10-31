const mongoose = require('mongoose');

// Document unique : les projets mis en avant sur la page d'accueil (dans l'ordre d'affichage).
const featuredProjectsSchema = mongoose.Schema({
    projectIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
}, { timestamps: true });

module.exports = mongoose.model('FeaturedProjects', featuredProjectsSchema);
