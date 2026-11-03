const mongoose = require('mongoose');

// Un « objet » du cabinet de curiosités (page À propos) : une photo cliquable qui ouvre un texte enrichi.
const curiosityItemSchema = mongoose.Schema({
    order: {type: Number, required: true},
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
    richText: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('CuriosityItem', curiosityItemSchema);
