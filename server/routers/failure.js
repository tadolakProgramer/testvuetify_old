const failureController = require('../controllers/failureController');


module.exports = (app) => {

    app.get('/failure', failureController.getListaMaszyn);

    app.get('/failure/new/', failureController.postNewFailure);

    app.post('/failure/new/:IDS',  failureController.postNewFailure);

    app.put('/failure/new', failureController.putNewFailure);

    app.get('/getFailureMachine', failureController.getFailureMachine);

    app.get('/getAllFailure', failureController.getAllFailure);
};