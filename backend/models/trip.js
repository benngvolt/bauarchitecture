const mongoose = require('mongoose');
const validator = require('validator');

const tripSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    mainImageIndex: { type: Number, required: false },
    trips: [
        {
        imageUrl: {type: String, required: false},
        }
    ],
});


module.exports = mongoose.model('Trip', tripSchema);