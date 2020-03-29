const AuthenticationController = require('../controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');

const Hale = require('../models/hale');

module.exports = (app) => {
    app.post('/register',AuthenticationControllerPolicy.register, AuthenticationController.register);

    app.get('/register' , (req, res,next) => {
      Hale.findAll()
          .then(hale => res.send(hale))
          .catch(error => console.log(error));

    });
};