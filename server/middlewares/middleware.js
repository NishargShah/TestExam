const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const {CLIENT_SITE} = process.env;
const app = express();

app.use(cors({credentials: true, origin: [CLIENT_SITE]}));
app.options('*', cors());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../', 'views'));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({limit: '25mb'}));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

module.exports = app;
