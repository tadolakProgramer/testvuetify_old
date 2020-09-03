const components = require('../models/PodzespolMaszyny')

module.exports = {

    async getTree(req, res) {
        try {
            await components.findAll({})
                .then(tree => res.send(tree))
                .catch(error => console.log(error))
        }
        catch (e) {
            console.log('tree error', e);
            res.status(400).send({
                error: 'tree error'
            })
        }
    }
}
