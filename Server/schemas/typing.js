const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typingRecordSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    typingWins: {
        type: Number,
        required: true
    },
    recordWPM: {
        type: Number,
        required: true
    },
    wordsCleared: {
        type: Number,
        required: true
    }
    
}, {timestamps: true})

const TypingRecord = mongoose.model('TypingRecord', typingRecordSchema);

module.exports = TypingRecord;

