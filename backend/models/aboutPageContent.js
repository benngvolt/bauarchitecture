const mongoose = require('mongoose');

const aboutPageContentSchema = mongoose.Schema({
    philosophyText: {type: String, required: false},
    // Premier portrait (nom historique du champ) et second portrait, affichés à gauche du texte.
    philosophyImageUrl: {type: String, required: false},
    portrait2Url: {type: String, required: false},
    // Anciennes grandes photos de la page et ancien texte du CV : plus affichés (remplacés par les objets du cabinet de curiosités),
    // conservés en base pour ne rien perdre.
    photo1Url: {type: String, required: false},
    curriculumText: {type: String, required: false},
    photo2Url: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('AboutPageContent', aboutPageContentSchema);
