const mongoose = require('mongoose');

const heroSettingsSchema = mongoose.Schema({
    // Anciennement : image unique. Conservé (= première image de la liste) pour compatibilité.
    imageUrl: {type: String, required: false},
    images: [
        {
        imageUrl: {type: String, required: false},
        }
    ],
    // Textes éditables du hero (vides = textes par défaut, gérés côté frontend)
    title: {type: String, required: false},
    description: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('HeroSettings', heroSettingsSchema);
