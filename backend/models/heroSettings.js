const mongoose = require('mongoose');

const heroSettingsSchema = mongoose.Schema({
    // Anciennement : image unique. Conservé (= première image de la liste) pour compatibilité.
    imageUrl: {type: String, required: false},
    images: [
        {
        imageUrl: {type: String, required: false},
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('HeroSettings', heroSettingsSchema);
