const components = require('../models/PodzespolMaszyny')

module.exports = {

    async getTree(req, res) {
        const IdMaszyna = req.query.IDS;
        try {
            components.findAll({
                where: {
                    MaszynaID: IdMaszyna
                }
            })
                .then(tree =>
                    res.send(tree)
                )
                .catch(error => console.log(error))
        }
        catch (e) {
            console.log('tree error', e);
            res.status(400).send({
                error: 'tree error'
            })
        }
    },
    async postAddNewNode(req, res) {
        try {
            const newNode = req.body;
            components.create(newNode)
                .then(node => res.send(node))
            console.log(newNode)
        }
        catch (e) {
            console.log(e)
        }
    },
    async postUpdateNode(req, res){
        const ID =  req.body.ID_Podzespol
        console.log("log",req.body)
        await components.update({
            pdz_informacje: req.body.pdz_informacje},
            {
            where:{
                ID_Podzespol: ID
            }
        })
            .then(()=> {
                components.findOne({where:{ID_Podzespol:ID}})
                    .then(node => res.send(node))
                    .catch(e => console.log(e))
            })
        console.log(ID)
    }
}
