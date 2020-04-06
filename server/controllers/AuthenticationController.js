const Users = require('../models/users');
const Hale = require('../models/hale');

module.exports = {
    async register(req, res) {
        try {

            const {count, rows} = await Users.findAndCountAll(
                {where: {US_LOGIN: req.body.US_LOGIN}});
            console.log(count);
            if (count < 1) {
                await Users.create(req.body);
                res.status(400).send({"ServerMessageOK": "Jest OK!!!"})
            } else {
                res.status(400).send({"ServerMessageE": "Taki login juz istnieje!!!"});
            }
        } catch (err) {
            console.log('error', err);
            res.status(400).send({
                error: 'This Login account is already in use.'
            })
        }
    },
    async login(req, res) {
        try {
            console.log('reqbody ', req.body);
            const {US_LOGIN, US_PASS} = req.body;
            const user = await Users.findOne({
                where: {
                    US_LOGIN: US_LOGIN
                }
            })
            if (!user) {
                res.status(400).send({"LoginError":"Nie ma takiego urzytkownika"});
                console.log('no user');
            }
            if (user){
                console.log('user OK!')
            }
        } catch (error) {
            console.log('login error');
            res.send('dupa');
        }
    },
    async getHale(req, res) {
        await Hale.findAll()
            .then(hale => res.send(hale))
            .catch(error => console.log(error));
    }
};

