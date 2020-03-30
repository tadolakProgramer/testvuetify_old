const Users = require('../models/users');
const Hale = require('../models/hale');

module.exports ={
    async register (req, res) {
        try {
            console.log(req.body);
            const user = await Users.create(req.body);
            res.send(user.toJSON())
        } catch (err) {
            console.log('error', err);
            res.status(400).send({
                error: 'This Login account is already in use.'
            })
        }
    },
    async getHale (req, res) {
        await Hale.findAll()
            .then(hale => res.send(hale))
            .catch(error => console.log(error));
    }
};

