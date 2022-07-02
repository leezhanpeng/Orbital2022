const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendreqsSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Friendreq = mongoose.model('FriendRequest', friendreqsSchema);

module.exports = Friendreq;