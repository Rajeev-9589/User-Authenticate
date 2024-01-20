const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
   UserId:{
    type: String,
    required: true,
    unique: true,
   },
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    ImagePath: {
        type: String,
        required: true,
    },
});

const Dtls = mongoose.model('Details', DetailSchema);

module.exports = Dtls;
