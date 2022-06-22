const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imgname: {
        type: String,
        required: true
    },
    imagebase64: {
        type: String,
        required: true
    }


}, { timestamps: true });

const Newsletter = mongoose.model('Newsletter', newsSchema);

module.exports = Newsletter;