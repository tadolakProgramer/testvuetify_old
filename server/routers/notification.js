const notificationController = require('../controllers/notificationController');

module.exports = (app) => {

    app.get('/notification', notificationController.getListaMaszyn);

    app.post('/notification/new', notificationController.postNewNotification);
};