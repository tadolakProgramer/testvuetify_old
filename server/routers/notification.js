const notificationController = require('../controllers/notificationController');


module.exports = (app) => {

    app.get('/notification', notificationController.getListaMaszyn);

    app.get('/notification/new/', notificationController.postNewNotification);

    app.post('/notification/new/:IDS',  notificationController.postNewNotification);

    app.put('/notification/new', notificationController.putNewNotification);
};
