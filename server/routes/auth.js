const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        req.userData = jwt.verify(token, "secret");
        // console.log(req.userData);
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed"
        });
    }
};
