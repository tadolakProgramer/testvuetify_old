const statisticController = require('../controllers/statisticController')

module.exports = (app) => {

    app.get('/statistic/cauntFailureByMachine', statisticController.getCountFailureByMachine);

    app.get('/statistic/failurePerMonth', statisticController.getfailurePerMonth)

    app.get('/statistic/failureMachineryByMonth', statisticController.getFailureMachineryByMonth)
};