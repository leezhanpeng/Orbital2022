const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dp: {
        type: String,
    },
    title: {
        type: String
    },
    bios: {
        type: String
    }
    
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;

