const mongoose = require('mongoose');

// Document unique : textes de la section « Approche » de la page d'accueil.
// Un titre vide ou une liste vide laisse la page afficher ses textes par défaut.
const approachSettingsSchema = mongoose.Schema({
    title: { type: String, default: '' },
    items: [{
        title: { type: String, required: true },
        text: { type: String, default: '' },
    }],
}, { timestamps: true });

module.exports = mongoose.model('ApproachSettings', approachSettingsSchema);
