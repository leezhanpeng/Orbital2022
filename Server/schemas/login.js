const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });

const LoginRec = mongoose.model('LoginRecord', loginSchema);

module.exports = LoginRec;