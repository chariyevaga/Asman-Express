'use strict';
const { Sequelize } = require('sequelize');
const { DB_SERVER, DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_PORT } = process.env;

if (!DB_SERVER || !DB_NAME || !DB_USER_NAME || !DB_PASSWORD || !DB_PORT) {
    new Error(
        'Error occurred in db settings configurations. Some environments missing.'
    );
}

module.exports = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
    host: DB_SERVER,
    dialect: 'mssql',
    port: DB_PORT,
    dialectOptions: {
        options: {
            requestTimeout: 3000000,
            useUTC: true,
            dateFirst: 1,
        },
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    },
});
