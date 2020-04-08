const passport = require('passport');
const LocalStoragy = require('passport-local').Strategy;
const {validationResult} = require('express-validator');
const pass = require('./password');
const Users = require('../models/users');

passport.use('local.register', new LocalStoragy({
        usernameField: 'US_LOGIN',
        passwordField: 'US_PASS',
        passReqToCallback: true
    },
    async (req, US_LOGIN, US_PASS, done) => {
        const {count, rows} = await Users.findAndCountAll(
            {where: {US_LOGIN: req.body.US_LOGIN}});
        if (count > 0) {
            return done(null, null)
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return done(null, null, req.status('message', errors[0]));
        }
        const hashPass = pass.encryptPassword(req.body.US_PASS);
        const user = Users.create({
            US_Name: req.body.US_Name,
            US_SUER_NAME: req.body.US_SUER_NAME,
            US_LOGIN: req.body.US_LOGIN,
            US_PASS: hashPass,
            US_PROFESJA: req.body.US_PROFESJA,
            Hala_ID: req.body.Hala_ID
        });
        console.log(user);
        return done(null, user.insertId);
        /*res.status(400).send({"ServerMessageOK": "Jest OK!!!"})*/
    }
));

passport.use('local.login', new LocalStoragy({
    usernameField: 'US_LOGIN',
    passwordField: 'US_PASS',
    passReqToCallback: true
}, async (req, US_LOGIN, US_PASS, done) => {
    const {count, rows} = await Users.findAndCountAll(
        {where: {US_LOGIN: req.body.US_LOGIN}});
    if (rows.length > 0) {
        const User = rows[0];
        const validPassword = pass.machPassword(US_PASS, User.US_PASS);
        if (validPassword) {
            done(null, User, console.log('success', 'Witaj ' + User.US_Name));
        } else {
            done(null, false, console.log('message', 'Nie prawidłowe hasło'));
        }
    } else {
        done(null, false, console.log('message', 'Nie ma takiego użytkownika'));
    }
}));

passport.serializeUser((User, done) => {
    done(null, User.ID_USER);
});

passport.deserializeUser(async (ID_USER, done) => {
    const {count, rows} = await Users.findAndCountAll(
        {where: {ID_USER: ID_USER}});
    done(null, rows[0]);
});
