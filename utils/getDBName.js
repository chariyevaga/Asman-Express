'use strict';
const { DB_NAME = 'TIGERDB' } = process.env;
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
module.exports = async (firmNr) => {
    return sequelize
        .query(
            `SELECT TOP 1 DBNAME FROM ${DB_NAME}.dbo.L_CAPIFIRM WHERE NR = :firmNr`,
            {
                plain: true,
                replacements: { firmNr },
                type: QueryTypes.SELECT,
            }
        )
        .then((data) => {
            return data.DBNAME ? data.DBNAME : DB_NAME;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
