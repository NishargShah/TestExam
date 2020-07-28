const User = require('../models/userModel');
const {sendResWithJWT} = require('./fnController');
const {AppError, catchAsync} = require('../utils/appError');
const {filterBody} = require("../utils/helper");
const {JWT_COOKIE_NAME, CLIENT_HOST} = process.env;

exports.signup = catchAsync(async(req, res, next) => {
    let user = filterBody(req.body, 'username', 'email', 'password');
    user = await User.create(user);
    await sendResWithJWT(user, 201, req, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    if (!email) return next(new AppError('Please provide your email.'), 400);
    if (!password) return next(new AppError('Please provide your password.'), 400);

    let user = await User.findOne({email}).select('+password');
    if (!user) return next(new AppError('Incorrect email or password', 401));

    const checkPass = await user.comparePassword(password, user.password);
    if (!user || !checkPass) return next(new AppError('Incorrect email or password', 401));

    await sendResWithJWT(user, 200, req, res);
});

exports.getUser = catchAsync(async(req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) return next(new AppError('No user found with this ID', 400));
    res.status(200).json({
        status: 'success',
        user
    });
});

exports.logout = catchAsync(async(req, res, next) => {
    if (!req.cookies.token) return next(new AppError('Your token has expired.', 400));

    res.cookie(JWT_COOKIE_NAME, 'logout', {
        domain: CLIENT_HOST,
        expires: new Date(Date.now() + 10 * 1000)
    });
    res.clearCookie(JWT_COOKIE_NAME);
    res.status(205).json({status: 'success'});
});

