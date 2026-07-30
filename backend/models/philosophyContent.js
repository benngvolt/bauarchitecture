const mongoose = require('mongoose');

const philosophyContentSchema = mongoose.Schema({
    text: {type: String, required: false},
    imageUrl: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('PhilosophyContent', philosophyContentSchema);
