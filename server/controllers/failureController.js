const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');
const listaAwarii = require('../models/listaAwarii')

module.exports = {
    async getListaMaszyn(req, res) {
        try {
            await vMaszyny.findAll({})
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
            if (req.body.ID_AWARIA === 0){
            console.log("AwariaCreate:",req.body.ID_AWARIA)
            await awaria.create(req.body)
                .then(awaria => res.send(awaria))
            }else{
                console.log("AwariaUpdate:",req.body.ID_AWARIA)
                const Dane = req.body.ID_AWARIA
                console.log("AwariaDane:",Dane)
                console.log("AwariaUpdate:",Dane.ID_AWARIA)
                const ID_Awaria = Dane.ID_AWARIA
                await awaria.update({AW_OpisAwarii:Dane.AW_OpisAwarii},{
                    where:{ ID_AWARIA: ID_Awaria
                    }})
                    .then(awaria => res.send(awaria))
            }
        } catch (e) {
            await res.send.status(400).send({error: 'Wystąpił błąd zapisu do bazy danych'})

        }
    },
    async getAllFailure(req, res) {
        try {
            listaAwarii.findAll(req.body)
                .then(listaAwarii => res.send(listaAwarii))
                .catch(e => console.log(e))
        } catch {
            res.send('Awaria')

        }
    },
    async getFailureMachine(req, res) {
        const IdMaszyna = req.query.IdMaszyna;
        console.log(IdMaszyna)
        try {
            listaAwarii.findAll({
                where: {
                    ID_Maszyna: IdMaszyna
                }
            })
                .then(awaria => {
                    res.send(awaria)})
        }
        catch (e) {
            console.log(e)
        }
    }

};
