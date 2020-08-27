const { Answer, Result } = require('../model');

const answerController = {
    all(req, res) {
        Answer.find({}).exec((err, r) => {
            res.json(Result.ok(r));
        })
    },
    getByQuestion(req,res) {
        Answer.find({question_id: req.params.question_id}).exec((err, r) => {
            res.json(Result.ok(r));
        });
    },
    getOne(req, res) {
        Answer.findOne({
            _id: req.params.id
        }).exec((err, r) => {
            res.json(Result.ok(r));
        })
    },
    update(req, res) {
        Answer.updateOne( {_id: req.params.id}, {...req.body} , (err, updated) => {
            res.json(Result.ok(updated));
        });
    },
    create(req, res) {
        let newAnswer = new Answer(req.body);
        if(!newAnswer.content || !newAnswer.question_id) {
            res.json(Result.error(newAnswer, 'Content & Question ID is required.'));
            return;
        }
        newAnswer.timestamp = new Date().toISOString();
        newAnswer.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        newAnswer.save((err, saved) => {
            res.json(Result.ok(saved));
        })
    },
    remove(req, res) {
        Answer.findOne( { s_id: req.params.id}).remove((err, removed) => {
            res.json(Result.ok(removed));
        })
    }
}

module.exports = answerController;