const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ticketLink: {
        type: String,
        required: true
    }
});

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;
