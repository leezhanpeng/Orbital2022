const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snakeRecordSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    snakeWins: {
        type: Number,
        required: true
    },
    recordLength: {
        type: Number,
        required: true
    },
    jewelsCollected: {
        type: Number,
        required: true
    },
    sabosGiven: {
        type: Number,
        required: true
    },
    powerupsReceived: {
        type: Number,
        required: true
    },
    recordTime: {
        type: String,
        required: true
    },
    
}, {timestamps: true})

const SnakeRecord = mongoose.model('SnakeRecord', snakeRecordSchema);

module.exports = SnakeRecord;

