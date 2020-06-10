const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const v_failureMachineryByMonth = sequelize.define('v_failureMachineryByMonth', {
    Maszyna_ID: {type: Sequelize.INTEGER,
        primaryKey: true},
    Year_ID: {type: Sequelize.INTEGER,},
    Month: {type: Sequelize.INTEGER},
    SumaAwariiA: {type: Sequelize.INTEGER},
    SumaAwariiM: {type: Sequelize.INTEGER},
    NazwaMaszyny: {type: Sequelize.STRING}
});

module.exports = v_failureMachineryByMonth;