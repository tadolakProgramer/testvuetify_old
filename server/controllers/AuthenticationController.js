const Users = require('../models/users');
module.exports ={
    async register (req, res) {
        try {
            const user = await Users.create(req.body);
            res.send(user.toJSON())
        } catch (err) {
            console.log('ddfddgd', err);
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    }
};