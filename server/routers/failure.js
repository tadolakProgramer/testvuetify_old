const failureController = require('../controllers/failureController');


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

    app.get('/failure/gatMachineArea', failureController.getMachineArea);

    app.put('/addWorkersToFailure', failureController.putAddWorkersToFailure);

    app.get('/getPartsFromFailureParts', failureController.getPartsFromFailureParts);

    app.post('/failure/addPartToFailutre', failureController.postAddPartToFailure);

    app.post('/failure/deleteOneFailure/', failureController.deleteOneFailure);
};
