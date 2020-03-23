const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const Users = sequelize.define('User', {
    ID_USER: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    US_Name: {
        type: Sequelize.STRING,
        allowNull: false},
    US_SUER_NAME: {
        type: Sequelize.STRING,
        allowNull: false},
    US_LOGIN: {
        type: Sequelize.STRING,
        allowNull: false},
    US_PASS: {
        type: Sequelize.STRING,
        allowNull: false},
    US_PROFESJA: {
        type: Sequelize.ENUM('Operator','Automatyk','Mechanik',''),
        allowNull: false},
    Hala_ID: {
        type: Sequelize.INTEGER,
        allowNull: false}
});

module.exports = Users;
