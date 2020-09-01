const {Record, Result} = require('../model');

const recordController = {
    getUpvoted(req, res) {
        Record.find({
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            operation: 'upvote'
        }, (err, r) => {
            res.json(Result.ok(r));
        })
    },

    getDownvoted(req, res) {
        Record.find({
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            operation: 'downvote'
        }, (err, r) => {
            res.json(Result.ok(r));
        })
    },

    getAll(req, res) {
        Record.find({ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress}, (err, r) => {
            res.json(Result.ok(r));
        })
    },
}

module.exports = recordController;
