const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');
const listaAwarii = require('../models/listaAwarii')
const workers = require('../models/workers')
const failureWorkers = require('../models/awariaPracownik')
const failureParts = require('../models/v_failureParts')
const failurePart = require('../models/failurePart')
const machineryArea = require('../models/v_maszynaObszar')

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
                    AW_MO_ID: req.body.AW_MO_ID,
                    AW_MO_Symbol: req.body.AW_MO_Symbol,
                    AW_DataZgloszenia: req.body.AW_DataZgloszenia,
                    AW_Zglaszajacy_ID: req.body.AW_Zglaszajacy_ID,
                    AW_OpisAwarii: req.body.AW_OpisAwarii,
                    AW_Typ: req.body.AW_Typ,
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
    async getWorkersFromAwariaPracownik(req, res) {
        try{
            const ID_AWARIA = req.query.ID_AWARIA
            failureWorkers.findAll({
                where: {AWPR_ID_AWARIA : ID_AWARIA}
            }).then(failureWorkers => res.send(failureWorkers))
        }
        catch (e) {
            console.log(e)
        }
    },
    async putAddWorkersToFailure(req, res){
        const wpis = req.body;
        const AWPR_ID_AWARIA = req.body[0].AWPR_ID_AWARIA;
        failureWorkers.destroy({
            where:{
                AWPR_ID_AWARIA:AWPR_ID_AWARIA
            }
        })
            failureWorkers.bulkCreate(wpis).then(failureWorkers => res.send(failureWorkers)
        )
    },
    async getPartsFromFailureParts(req, res) {
        try {
            const ID_AWARIA = req.query.ID_AWARIA
            failureParts.findAll({
                where: {AWCZ_AW_ID: ID_AWARIA}
            }).then(failureParts => res.send(failureParts))
        } catch (e) {
            console.log(e)
        }
    },
    async postAddPartToFailure(req, res){
        try {
            const partToFailure = req.body;
            failurePart.create(partToFailure)
                .then(failurePart => res.send(failurePart))
        }catch (e) {
            console.log(e)
        }
    },
    async deleteOneFailure(req, res){
        try {
            const ID_AWARIA = req.body.params
            await awaria.destroy({
                where: {ID_AWARIA: ID_AWARIA}
            })

            failureWorkers.destroy({
                where:{
                    AWPR_ID_AWARIA:ID_AWARIA
                }
            })
            failurePart.destroy({
                where: {AWCZ_AW_ID: ID_AWARIA}
            }).then(failurePart => res.send("failurePart"))
        }catch (e) {
            console.log("delete", e)
        }

    },
    async getMachineArea(req, res){
        console.log("getMachineArea", req.query.ID)
        const ID = req.query.ID;
        machineryArea.findAll({where:{
            ID_Typ:ID
            }})
            .then(machineryArea => res.send(machineryArea))
    }
};
