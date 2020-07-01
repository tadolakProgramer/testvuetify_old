const AuthenticationController = require('../controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');

const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {

    app.post('/register',  AuthenticationControllerPolicy.register, AuthenticationController.register);

    app.get('/register',  AuthenticationController.getHale);

    app.get('/typyMaszyn', AuthenticationController.getTypeMachine);

    app.post('/login', AuthenticationController.login);

}
