const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tag:{
        type:String,
        required:true,
        default:'UnAuthorised'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
