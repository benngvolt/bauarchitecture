const mongoose = require('mongoose');

// Document unique : petit descriptif affiché sous chacun des quatre pictogrammes de la page d'accueil.
// Un descriptif vide laisse le site afficher son texte par défaut.
const missionsSettingsSchema = mongoose.Schema({
    construction: { type: String, default: '' },
    renovation: { type: String, default: '' },
    extension: { type: String, default: '' },
    amenagements: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('MissionsSettings', missionsSettingsSchema);
