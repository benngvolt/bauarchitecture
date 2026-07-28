const mongoose = require('mongoose');

const heroSettingsSchema = mongoose.Schema({
    imageUrl: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('HeroSettings', heroSettingsSchema);
