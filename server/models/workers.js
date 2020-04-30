const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const workers = sequelize.define('Pracownicy', {
    PR_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    PR_imie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PR_Nazwisko: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PR_Aktywny: {
        type: Sequelize.TINYINT,
        allowNull: true
    }
})

module.exports = workers;
