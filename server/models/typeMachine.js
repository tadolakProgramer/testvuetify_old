const Sequelize = require('sequelize');

const sequelize = require('../database/databases');


const typeMachine = sequelize.define('TypMaszyny', {
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    NazwaTypu: {
        type: Sequelize.STRING,
        allowNull: false}
});

module.exports = typeMachine;