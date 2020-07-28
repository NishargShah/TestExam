const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {CLIENT_HOST, JWT_COOKIE_NAME, JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN} = process.env;

exports.sendResWithJWT = async(userObj, statusCode, req, res) => {
    const user = await User.findById(userObj._id);
    let token = jwt.sign({id: user._id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
    res.cookie(JWT_COOKIE_NAME, token, {
        domain: CLIENT_HOST,
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: req.secure
    });

    res.status(statusCode).json({
        status: 'success',
        token, user
    });
};

exports.apiRequest = (req) => {
    return req.originalUrl.startsWith('/api');
}
