require('dotenv').config({path: 'config.env'});
const chalk = require('chalk');
const mongoose = require('mongoose');
const {DB, PORT} = process.env;

process.on('uncaughtException', err => {
    console.log(chalk.blue(err.name, err.message));
    console.log(chalk.cyan('Uncaught Exception! ') + chalk.gray('SHUTTING DOWN...'));
    process.exit(1);
});

const app = require('./app');
const port = PORT || 5000;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB Connected!'));

const listen = app.listen(port, () => console.log(`Hello From Port ${port}`));

process.on('unhandledRejection', err => {
    console.log(chalk.blue(err.name, err.message));
    console.log(chalk.cyan('Unhandled Rejection! ') + chalk.gray('SHUTTING DOWN...'));
    listen.close(() => {
        process.exit(1); // 0 FOR SUCCESS & 1 FOR UNHANDLED SO CRASHED
    });
});


