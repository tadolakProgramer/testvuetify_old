const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const vTypesOfMachines = sequelize.define('V_TypMaszyny', {
     ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    NazwaTyu: {type: Sequelize.STRING},
});

module.exports = vTypesOfMachines;
