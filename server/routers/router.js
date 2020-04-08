const passport = require('passport');
const auth = require('../policies/auth');

const AuthenticationController = require('../controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');

module.exports = (app) => {

    app.post('/register', auth.isLoggedIn,
        passport.authenticate('local.register', {
            successRedirect: '/about',
            failureRedirect: '/',
            failureFlash: true
        }));

    app.get('/register', auth.isLoggedIn, AuthenticationController.getHale);

    app.post('/login', (req, res, next) => {
        passport.authenticate('local.login', {
            successRedirect: '/about',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next)
    });

    app.post('/');
};
