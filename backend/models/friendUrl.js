const mongoose = require('mongoose');

const friendUrlSchema = mongoose.Schema({
    itemName: {type: String, required: true},
    itemUrl: {type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model('FriendUrl', friendUrlSchema);
