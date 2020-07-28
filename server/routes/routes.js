const Router = require('express').Router();
const {signup, login, getUser, logout} = require('../controllers/userController');
const {userMe} = require('../middlewares/selfMiddleware');
const {protect} = require('../middlewares/authMiddleware');

Router.get('/', (req, res) => res.send('Hi, I am an API Home Page'));

Router.get('/me', protect, userMe, getUser);

Router.post('/signup', signup);
Router.post('/login', login);

Router.get('/logout', protect, logout);

module.exports = Router;
