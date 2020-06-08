const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const v_failurePerMonthe = sequelize.define('v_failureByMonth', {
    Year_ID: {type: Sequelize.INTEGER,
        primaryKey: true},
    Month: {type: Sequelize.INTEGER},
    SumaAwariiA: {type: Sequelize.INTEGER},
    SumaAwariiM: {type: Sequelize.INTEGER},
});

module.exports = v_failurePerMonthe;