const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'NaprawyJS', 'NGCJrJM8DLNDhQAG', {
  dialect: 'mysql',
  host: '91.233.233.105',
  port: '13366',
  define: {
    freezeTableName: true, // Do not change my table names.
    timestamps: false // I will do this individually, thanks.
},
});

module.exports = sequelize;
