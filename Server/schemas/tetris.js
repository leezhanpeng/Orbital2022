const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tetrisRecordSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    recordTime: {
        type: String,
        required: true
    },
    tetrisWins: {
        type: Number,
        required: true
    },
    total40LinesFinished: {
        type: Number,
        required: true
    },
    totalLinesCleared: {
        type: Number,
        required: true
    },
    tetrisesCleared: {
        type: Number,
        required: true
    }
    
}, {timestamps: true})

const TetrisRecord = mongoose.model('TetrisRecord', tetrisRecordSchema);

module.exports = TetrisRecord;

