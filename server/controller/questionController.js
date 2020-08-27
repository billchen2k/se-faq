const { Question, Result } = require('../model');

const questionController = {
    all(req, res) {
        Question.find({}).exec((err, r) => {
            res.json(Result.ok(r));
        })
    },
    getOne(req, res) {
        Question.findOne({
            _id: req.params.id
        }).exec((err, r) => {
            res.json(Result.ok(r));
        })
    },
    update(req, res) {
        Question.updateOne( {_id: req.params.id}, {...req.body} , (err, updated) => {
            res.json(Result.ok(updated));
        });
    },
    create(req, res) {
        let newQuestion = new Question(req.body);
        console.log(newQuestion);
        newQuestion.timestamp = new Date().toISOString();
        newQuestion.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        newQuestion.save((err, saved) => {
            res.json(Result.ok(saved));
        })
    },
    remove(req, res) {
        Question.findOne( {_id: req.params.id}).remove((err, removed) => {
            res.json(Result.ok(removed));
        })
    }
}

module.exports = questionController;