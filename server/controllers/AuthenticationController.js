const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');
const Hale = require('../models/hale');
const config = require('../config/config');

const saltRounds = 10;

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

async function isMatchPassword (PASS, Hash){
    await bcrypt.compare(PASS, Hash, function(err, result) {
        return result;
    })
}

module.exports = {
    async register(req, res) {
        try {

            const {count, rows} = await Users.findAndCountAll(
                {where: {US_LOGIN: req.body.US_LOGIN}});
            if (count < 1) {
                bcrypt.hash(req.body.US_PASS, saltRounds).then(function ( hash)  {
                 const user = Users.create({
                        US_Name : req.body.US_Name,
                        US_SUER_NAME: req.body.US_SUER_NAME,
                        US_LOGIN :  req.body.US_LOGIN,
                        US_PASS : hash,
                    US_PROFESJA: req.body.US_PROFESJA,
                    Hala_ID: req.body.Hala_ID});
                    const userJson = user.toJSON();
                    res.send({
                        user : userJson,
                        token: jwtSignUser(userJson)
                    });
                    res.status(400).send({"ServerMessageOK": "Jest OK!!!"})
                });
            } else {
                res.status(403).send({"ServerMessageE": "Taki login juz istnieje!!!"});
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
            });
            if (!user) {
                res.status(403).send({"LoginError":"Nie ma takiego urzytkownika"});
                console.log('no user');
            }

            const validPass = isMatchPassword(US_PASS, user.US_PASS);
            if (!validPass){
                res.status(403).send({"LoginError":"Nie pamiętasz hasła"});
            }

            const userJson = user.toJSON();
            res.send({
                user : userJson,
                token: jwtSignUser(userJson)
            });

        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    },
    async getHale(req, res) {
        await Hale.findAll()
            .then(hale => res.send(hale))
            .catch(error => console.log(error));
    }
};

