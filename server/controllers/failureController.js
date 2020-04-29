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

    async getMaszyna(req, res) {
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

    async getOneFailure(req, res) {
        try{
            const ID_AWARIA = req.query.ID_AWARIA;
            console.log("ID", ID_AWARIA)
            await listaAwarii.findByPk(ID_AWARIA)
                .then(awaria => res.send(awaria))
        }catch (e) {
            console.log('error', err);
            res.status(400).send({
                error: 'vMaszyny error'
            })
        }
    },

    async putNewFailure(req, res) {
        try {
            if (req.body.ID_AWARIA === 0){
                //Nowa awaria
            await awaria.create(req.body)
                .then(awaria => res.send(awaria))
                .catch(e => console.log(e))
            }else{
                //Edycja awarii
                const ID_Awaria = req.body.ID_AWARIA
                await awaria.update({
                    Maszyna_ID: req.body.ID_Maszyna,
                        AW_DataZgloszenia: req.body.AW_DataZgloszenia,
                    AW_Zglaszajacy_ID: req.body.AW_Zglaszajacy_ID,
                    AW_OpisAwarii: req.body.AW_OpisAwarii,
                    AW_Dzialania: req.body.AW_Dzialania,
                    AW_Zrealizowane: req.body.AW_Zrealizowane,
                    AW_DataZakonczenia: req.body.AW_DataZakonczenia},
                    {
                    where:{ ID_AWARIA: ID_Awaria
                    }})
                    .then(() => {
                        awaria.findOne({where:{ID_AWARIA: ID_Awaria
                            }}).then(awaria => res.send(awaria))
                    })
                    .catch(e => console.log("e",e))
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
        const IdMaszyna = req.query.IDS;
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
