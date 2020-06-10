const countFailureByMachine = require('../models/v_counFailure');
const failurePerMonth = require('../models/v_failurePerMonth');
const failureMachineryByMonth = require('../models/v_failureMachineryByMonth')

module.exports ={
    async getCountFailureByMachine(req, res) {
        await countFailureByMachine.findAll({})
            .then(countFailureByMachine => res.send(countFailureByMachine))
            .catch(error => console.log(error))
    },
    async getfailurePerMonth(req, res) {
        await failurePerMonth.findAll({})
            .then(failurePerMonth => res.send(failurePerMonth))
            .catch(error => console.log(error))
    },
    async getFailureMachineryByMonth(req, res){
        const IDS = req.query.IDS
        await failureMachineryByMonth.findAll({
            where: {MaszynaID: IDS}
        })
            .then(failureMachineryByMonth => res.send(failureMachineryByMonth))
            .catch(error => console.log(error))
    }
}