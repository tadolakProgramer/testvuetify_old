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
        allowNull: false,
        unique: true},
    US_SUER_NAME: {
        type: Sequelize.STRING,
        allowNull: true},
    US_LOGIN: {
        type: Sequelize.STRING,
        allowNull: true},
    US_PASS: {
        type: Sequelize.STRING,
        allowNull: true},
    US_PROFESJA: {
        type: Sequelize.ENUM('Operator','Automatyk','Mechanik',''),
        allowNull: true},
    Hala_ID: {
        type: Sequelize.INTEGER,
        allowNull: true}
});

module.exports = Users;
