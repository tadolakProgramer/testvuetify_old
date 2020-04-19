const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');

module.exports = {
    async getListaMaszyn(req, res) {
        try {
            await vMaszyny.findAll({
            })
                .then(listaMaszyn => res.send(listaMaszyn))
                .catch(error => console.log(error))
        } catch (err) {
            console.log('error', err);
            res.status(400).send({
                error: 'vMaszyny error'
            })
        }
    },
    async postNewFailure(req, res) {
        try {
            const IDS = req.query.IDS;
            await vMaszyny.findOne({
                where: {
                    ID_Maszyna: IDS
                }
            })
                .then(maszynka => {
                    res.send(maszynka)
                })
                .catch(error => console.log(error))
        } catch (err) {
            console.log('error', err);
            res.status(400).send({
                error: 'vMaszyny error'
            })
        }
    },
    async putNewFailure(req, res) {
        console.log(await req.body)
        try {
            awaria.create(req.body)
               /* .this(message => res.send(message, 'Wszystko OK'))
                .cache(error => console.log(error))*/
        } catch (e) {
            console.log(e)
        }
    }
};
