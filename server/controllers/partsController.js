const vParts = require('../models/v_parts')
module.exports = {
    async getAllParts(req, res){
        try{
            await vParts.findAll({})
                .then(partsList => res.send(partsList))
                .catch(error => console.log(error))
        }
        catch (err) {
            console.log('error', err);
            res.status(400).send({
                error: 'partsList error'
            })
        }
    }
}