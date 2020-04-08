const notificationController = require('../controllers/notificationController');

const isAuthenticated = require('../policies/isAuthenticated');

const passport = require('passport');


module.exports = (app) => {

    app.get('/notification',isAuthenticated, notificationController.getListaMaszyn);

    app.post('/notification/new', notificationController.postNewNotification);
};
