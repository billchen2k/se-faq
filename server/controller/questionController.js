const { Question, Result } = require('../model');
const Utils = require('../util');

const questionController = {
    all(req, res) {
        Question.find({}, (err, r) => {
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
    async create(req, res) {
        let newQuestion = new Question(req.body);
        // 5 question 1 day at most.
        let asked = await Question.find( { ip: Utils.extractIP(req), timestamp: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()} } ).exec();
        if(asked.length > 5){
            console.log(asked);
            res.json(Result.error('', '每天最多 5 个问题。'));
            return;
        }
        if(!newQuestion.content) {
            res.json(Result.error(newQuestion, "Content is required."));
            return;
        }
        console.log(newQuestion);
        newQuestion.timestamp = new Date().toISOString();
        newQuestion.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        newQuestion.save((err, saved) => {
            res.json(Result.ok(saved));
        })
    },
    remove(req, res) {
        Question.remove({ _id: req.params.id }, (err, removed) => {
            res.json(Result.ok(removed));
        })
    }
}

module.exports = questionController;