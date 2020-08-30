let Utils = {
    extractIP(req) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
}

module.exports = Utils;