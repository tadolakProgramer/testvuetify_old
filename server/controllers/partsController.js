const vParts = require('../models/v_parts')
const parts = require('../models/parts')
const partsType = require('../models/partsType')
const partsProducer = require('../models/partsProducer')

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
    },
    async addPart(req, res){
        console.log(req.body)
        await parts.create(req.body)
            .then(part => res.send(part))
            .catch(error => console.log(error))
    },

    async getAllProducer(req, res){
        await partsProducer.findAll({})
            .then(partsProducer => res.send(partsProducer))
            .catch(error => console.log(error))
    },

    async postAddProducer(rq, res){

    },

    async getAllTypePart(req, res){
        await partsType.findAll({})
            .then(partsType => res.send(partsType))
            .catch(error => console.log(error))
    },

    async postAddTypePart(rq, res){

    }
}