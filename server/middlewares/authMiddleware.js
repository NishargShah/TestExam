const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {apiRequest} = require('../controllers/fnController');
const {AppError, catchAsync} = require('../utils/appError');
const {JWT_COOKIE_NAME, JWT_SECRET} = process.env;

exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies[JWT_COOKIE_NAME]) {
        token = req.cookies[JWT_COOKIE_NAME];
    }
    if (!token) {
        res.clearCookie(JWT_COOKIE_NAME);
        if (apiRequest(req)) {
            return next(new AppError('You are not logged in! please log in to get access.', 401));
        } else {
            return res.redirect('/login');
        }
    }

    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
        res.clearCookie(JWT_COOKIE_NAME);
        if (apiRequest(req)) {
            return next(new AppError('The user belonging to this token does no longer exist.', 401));
        } else {
            return res.redirect('/login');
        }
    }

    req.user = user;
    next();
});
