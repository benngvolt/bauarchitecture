const mongoose = require('mongoose');

const processStepSchema = mongoose.Schema({
    order: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    tagline: {type: String, required: true},
    richText: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('ProcessStep', processStepSchema);
