const Sequelize = require('sequelize');

const sequelize = require('../database/databases');


const Hale = sequelize.define('Hale', {
    ID_Hala: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    NazwaHali: {
        type: Sequelize.STRING,
        allowNull: false}
    });

    module.exports = Hale;