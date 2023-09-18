const jwt = require('jsonwebtoken');

function isLogin(req, res, next) {
    if (!req.cookies.sessionId) {
        req.isValidAdmin = false
    } else {
        try {
            const token = req.cookies.sessionId;
            const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
            req.isValidAdmin = true

        } catch (err) {
            // err
            req.isValidAdmin = false
        }
    }
    next()
}

module.exports = { isLogin }