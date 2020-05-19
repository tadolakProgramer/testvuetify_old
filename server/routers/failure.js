const failureController = require('../controllers/failureController');
const isAuth = require('../policies/isAuthenticated')

module.exports = (app) => {

    app.get('/failure', failureController.getListaMaszyn);

    app.get('/failure/new/', failureController.postNewFailure);

    app.get('/getMaszyna/', failureController.getMaszyna);

    app.post('/failure/new/:IDS',  failureController.postNewFailure);

    app.put('/failure/new', failureController.putNewFailure);

    app.get('/getFailureMachine', failureController.getFailureMachine);

    app.get('/getAllFailure', failureController.getAllFailure);

    app.get('/getOneFailure', failureController.getOneFailure);

    app.get('/getAllWorkers', failureController.getAllWorkers);

    app.get('/getWorkersFromAwariaPracownik', failureController.getWorkersFromAwariaPracownik);

    app.put('/addWorkersToFailure', failureController.putAddWorkersToFailure);
};
