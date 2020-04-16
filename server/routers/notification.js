const notificationController = require('../controllers/notificationController');

const isAuthenticated = require('../policies/isAuthenticated');

const passport = require('passport');


module.exports = (app) => {

    app.get('/notification', notificationController.getListaMaszyn);

    app.get('/notification/new/:maszynaId', notificationController.postNewNotification);

    app.post('/notification/new/',  notificationController.postNewNotification);
};
