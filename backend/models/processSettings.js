const mongoose = require('mongoose');

// Document unique : textes de la section « Étapes du processus » de la page d'accueil.
// Un titre vide laisse le site afficher sa phrase d'accroche par défaut.
const processSettingsSchema = mongoose.Schema({
    title: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ProcessSettings', processSettingsSchema);
