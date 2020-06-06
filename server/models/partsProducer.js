const Sequelize = require('sequelize');

const sequelize = require('../database/databases');


const partsProducer = sequelize.define('CZESCI_PRODUCENT', {
    CZPR_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    CZPR_NAZWA: {
        type: Sequelize.STRING,
        allowNull: false}
    });

    module.exports = partsProducer;