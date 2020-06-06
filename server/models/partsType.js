const Sequelize = require('sequelize');

const sequelize = require('../database/databases');


const partsType = sequelize.define('CZESCI_GRUPA', {
    CZGR_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    CZGR_NAZWA: {
        type: Sequelize.STRING,
        allowNull: false}
    });

    module.exports = partsType;