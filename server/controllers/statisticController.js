const countFailureByMachine = require('../models/v_counFailure');

module.exports ={
    async getCountFailureByMachine(req, res) {
        await countFailureByMachine.findAll({})
            .then(countFailureByMachine => res.send(countFailureByMachine))
            .catch(error => console.log(error))
    }
}