const user = require('../models/users');

module.exports ={
    isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin', )
    },

    isUR(req, res, next){
        if (req.isAuthenticated()) {
        return user.findOne({
            where: {
                ID_USER: req.user.ID_USER
            }
        })
        .then(user => {
            if (user.US_PROFESJA === 'Automatyk')
            {
                return next();
            }
            return res.redirect('/signin')
        })
        .catch(err => {
            console.log(err);
    })
    }
},

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
};
