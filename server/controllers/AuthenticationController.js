const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');
const Hale = require('../models/hale');
const config = require('../config/config');

const saltRounds = 10;

function jwtSignUser (user) {
    const ONE_DAY = 60 * 60 * 24;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_DAY
    })
}

module.exports = {
    async register(req, res) {
        try {
            const {US_LOGIN} = await req.body;
            const {count, row} = await Users.findAndCountAll({
                where: {US_LOGIN: US_LOGIN}
            })
            if (count < 1) {
                const hash = await bcrypt.hash(req.body.US_PASS, saltRounds);
                const user = Users.create({
                    US_Name: req.body.US_Name,
                    US_SUER_NAME: req.body.US_SUER_NAME,
                    US_LOGIN: req.body.US_LOGIN,
                    US_PASS: hash,
                    US_PROFESJA: req.body.US_PROFESJA,
                    Hala_ID: req.body.Hala_ID
                });
                const userJson = user.toJSON();
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })
            }
            else{
                res.status(403).send({"ServerMessage": "Taki login juz istnieje!!!"});
            }
        }
        catch (e) {
        }
    },
    async login(req, res) {
        try{
            const {US_PASS, US_LOGIN} = await req.body;
            const userData = await Users.findOne({
                where: {
                    US_LOGIN: US_LOGIN
                }
            })
            if (!userData){
                res.status(403).send({"LoginError": "Nie ma takiego urzytkownika"});
            }
            else{
                const validPass = await bcrypt.compare(US_PASS, userData.US_PASS)
                if (validPass) {
                    const userJson = userData.toJSON();
                    res.send({
                        user: userJson,
                        token: jwtSignUser(userJson)
                    })
                }
            else{
                    res.status(403).send({"LoginError": "Nie pamiętasz hasła??"});
                }
            }
        }
        catch (err) {
            console.log(err)
            res.status(403).send(
            {"LoginError": 'An error has occured trying to log in'})

        }
    },
    async getHale(req, res) {
        await Hale.findAll()
            .then(hale => res.send(hale))
            .catch(error => console.log(error));
    }
};

