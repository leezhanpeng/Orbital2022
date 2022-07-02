const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const displaypicSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    dp: {
        type: String,
    }

}, { timestamps: true });

const DisplayPic = mongoose.model('DisplayPic', displaypicSchema);

module.exports = DisplayPic;