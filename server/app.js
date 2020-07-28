const app = require('./middlewares/middleware');
const {AppError} = require('./utils/appError');

app.use('/api', require('./routes/routes'));
app.use('/', (req, res) => res.send('Hi, I am a Landing Page'));

// IF NO ROUTES MATCHING ABOVE THAN IT WILL DISPLAY BELOW ROUTE
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find '${req.originalUrl}' on this server`, 404));
});

// IF YOU PASS ARGUMENT IN NEXT FUNCTION, IT WILL AUTOMATICALLY GOTO ERROR HANDLER BY EXPRESS
app.use(require('./controllers/errorController'));

module.exports = app;
