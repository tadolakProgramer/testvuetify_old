const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');

module.exports = {
    async getListaMaszyn(req, res) {
        try {
            const IdHala = req.query.IdHala;
            await vMaszyny.findAll({
                where:{
                    Hala_id : IdHala
                }
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
    async postNewNotification(req, res) {
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
    async putNewNotification(req, res) {
        try {
            await awaria.create(req.body)
                .then(awaria => res.send(awaria))
                .catch(e => console.log(e))
        }
    catch (e) {
            res.send.status(400).send({error: 'Wystąpił błąd zapisu do bazy danych'})
        }
    }
};
