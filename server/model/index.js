const mongoose = require('mongoose');
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = {
    id: ObjectId,
    content: String,
    timestamp: String,
    ip: String,
    hide: {type: Number, default: 0},
    contact: { type: String, default: ''},
    nickname: { type: String, default: ''}
};

const answerSchema = {
    id: ObjectId,
    question_id: ObjectId,
    content: String,
    timestamp: String,
    ip: String,
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    ecnuid: { type: String, default: '' },
    contact: { type: String, default: '' },
    nickname: { type: String, default: '' }
};

const Result = {
    ok(data, message = "ok") {
        return {
            success: true,
            timestamp: new Date().toISOString(),
            message: message,
            data: data || {}
        }
    },
    error(data, error) {
        return {
            success: false,
            timestamp: new Date().toISOString(),
            message: error.message || error,
            data: data || "N/A"
        }
    }
}

const Question = model('question', questionSchema);
const Answer = model('answer', answerSchema);

module.exports = { Question, Answer, Result };