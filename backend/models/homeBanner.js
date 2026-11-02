const mongoose = require('mongoose');

// Document unique : image pleine largeur de la page d'accueil (entre « Approche » et « Étapes du processus »).
// Sans image enregistrée, le site affiche une image de projet par défaut.
const homeBannerSchema = mongoose.Schema({
    imageUrl: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('HomeBanner', homeBannerSchema);
