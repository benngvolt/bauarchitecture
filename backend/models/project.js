const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: false},
    projectState: {type: String, required: false},
    projectType: {type: String, required: true},
    creationDate: {type: String, required: false},
    description: {type: String, required: false},
    surface: {type: String, required: false},
    price: {type: Number, required: false},
    moreInfos: {type: String, required: false},
    mainImageIndex: { type: Number, required: false },
    images: [
        {
        imageUrl: {type: String, required: false},
        photograph: {type: String, required: false},
        }
    ],
});


module.exports = mongoose.model('Project', projectSchema);