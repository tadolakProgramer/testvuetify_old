const statisticController = require('../controllers/statisticController')

module.exports = (app) => {

    app.get('/statistic/cauntFailureByMachine', statisticController.getCountFailureByMachine);
};