const vMaszyny = require('../models/v_maszyny');
const awaria = require('../models/awarie');
const listaAwarii = require('../models/listaAwarii')
const transporter = require('../config/mail')

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
                .then(async awaria => {
                    res.send(awaria)
                    const ID_AWARIA = awaria.ID_AWARIA;
                    await listaAwarii.findByPk(ID_AWARIA)
                        .then(awaria => {
                            mailOptions = {
                                from: 'zgloszenie.awari@folplast.com.pl',
                                to: 'automatycy@folplast.com.pl',
                                subject: awaria.NazwaMaszyny,
                                text: awaria.AW_OpisAwarii,
                                html: 'Witam,</br>\n\n' +
                                    'Zgłaszam awarię maszyny: '+ awaria.NazwaMaszyny + '</br>\n\n' +
                                    'Opis awarii: ' + awaria.AW_OpisAwarii + '</br>\n\n' +
                                    '</br> Zgłaszający: ' + awaria.US_Name +' '+ awaria.US_SUER_NAME + '\n\n' + '</br>'
                            }
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            })
                        })
                })
                .catch(e => console.log(e))
        }
    catch (e) {
            res.send.status(400).send({error: 'Wystąpił błąd zapisu do bazy danych'})
        }
    }
};
