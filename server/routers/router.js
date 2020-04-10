const AuthenticationController = require('../controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');

const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {

    app.post('/register', isAuthenticated, AuthenticationControllerPolicy.register, AuthenticationController.register);

    app.get('/register', isAuthenticated, AuthenticationController.getHale);

    app.post('/login', AuthenticationController.login);

    app.post('/');

    app.get('/' , (req, res) =>{
        console.log("akuku")
        res.redirect('/')
    });
}
