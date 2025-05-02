const mongoose = require('mongoose');
const validator = require('validator');

const drawingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    mainImageIndex: { type: Number, required: false },
    drawings: [
        {
        imageUrl: {type: String, required: false},
        }
    ],
});


module.exports = mongoose.model('Drawing', drawingSchema);