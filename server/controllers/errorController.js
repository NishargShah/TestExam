const chalk = require('chalk');
const {apiRequest} = require('./fnController');
const {AppError} = require('../utils/appError');

const handleCastErrorDB = err => new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = err => {
    const dupField = Object.keys(err.keyValue)[0];
    const message = `${dupField} already exists.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(cur => cur.message);
    return new AppError(errors, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again!', 401);

const sendErrorDev = (err, req, res) => {
    if (apiRequest(req)) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    console.error(chalk.blue('Development Error'));
    console.error(chalk.red('ERROR 💥 ') + ' | ' + chalk.cyan(err.message));
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        message: err.message
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'ERROR';

    let error = {...err};
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    sendErrorDev(error, req, res);
};
