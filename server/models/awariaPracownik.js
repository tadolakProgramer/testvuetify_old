const Sequelize = require('sequelize');

const sequelize = require('../database/databases');


const awariaPracownik = sequelize.define('AWARIA_PRACOWNIK', {
    ID_AW_PR: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    AWPR_ID_AWARIA: {
        type: Sequelize.INTEGER,
        allowNull: false},
    AWPR_ID_PR: {
        type: Sequelize.INTEGER,
        allowNull: false}
});

module.exports = awariaPracownik;
