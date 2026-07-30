const mongoose = require('mongoose');

const aboutPageContentSchema = mongoose.Schema({
    philosophyText: {type: String, required: false},
    philosophyImageUrl: {type: String, required: false},
    photo1Url: {type: String, required: false},
    curriculumText: {type: String, required: false},
    photo2Url: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('AboutPageContent', aboutPageContentSchema);
