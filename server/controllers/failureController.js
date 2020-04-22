const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');
const listaAwarii = require('../models/listaAwarii')

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
        try {
            await awaria.create(req.body)
                .then(awaria => res.send(awaria))
                .cache(error => console.log(error))
        } catch (e) {
            console.log(e)
        }
    },
    async getAllFailure (req, res) {
        try {
            listaAwarii.findAll(req.body)
                .then(listaAwarii => res.send(listaAwarii))
                .catch(e => console.log(e))
        }
            catch {
                res.send('Awaria')

            }
        }

};
