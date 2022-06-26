const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tetrisRecordSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    record: {
        type: String,
        required: true
    },
    wins: {
        type: Int16Array,
        require: true
    },
    linesCleared: {
        type: Int16Array,
        required: true
    },
    tetrisesCleared: {
        type: Int16Array,
        required: true
    },
    tspinsDone: {
        type: Int16Array,
        required: true
    }
    
}, {timestamps: true})

const TetrisRecord = mongoose.model('TetrisRecord', tetrisRecordSchema);

module.exports = TetrisRecord;

