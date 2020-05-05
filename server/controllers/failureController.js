const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');
const listaAwarii = require('../models/listaAwarii')
const workers = require('../models/workers')
const failureWorkers = require('../models/awariaPracownik')

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
    },
    async getAllWorkers (req, res) {
        try{
            workers.findAll({
                where:{PR_Aktywny :1 }
            })
                .then(workers => res.send(workers))
        }
        catch (e) {
            console.log(e)
        }
    },
    async getWorkersFromAwariaPracownik (req, res) {
        try{
            console.log("IDDDD", req.query.ID_AWARIA)
            const ID_AWARIA = req.query.ID_AWARIA

            failureWorkers.findAll({
                where: {AWPR_ID_AWARIA : ID_AWARIA}
            }).then(failureWorkers => res.send(failureWorkers))
        }
        catch (e) {
            console.log(e)
        }
    }

};
