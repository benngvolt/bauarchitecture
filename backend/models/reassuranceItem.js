const mongoose = require('mongoose');

const reassuranceItemSchema = mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('ReassuranceItem', reassuranceItemSchema);
