const mongoose = require('mongoose');

const faqItemSchema = mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model('FaqItem', faqItemSchema);
