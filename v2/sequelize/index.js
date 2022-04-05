'use strict';
const { applyExtraSetup } = require('./extra-setup');

// const sequelize = require('../../config/db2');
const { Sequelize } = require('sequelize');

const modelDefiners = [
    require('./models/brand.model'),
    require('./models/unit.model'),
    require('./models/itemUnit.model'),
    require('./models/item.model'),
    require('./models/division.model'),
    require('./models/warehouse.model'),
    require('./models/client.model'),
    require('./models/currency.model'),
    require('./models/exchange.model'),
    require('./models/stock.model'),
    require('./models/barcode.model'),
    require('./models/price.model'),
    require('./models/itemCrossSale.model'),
    require('./models/attribute.model'),
    require('./models/attributeKey.model'),
    require('./models/attributeValue.model'),
];
const modelByDBName = (DATABASE_NAME) => {
    const sequelize = new Sequelize(
        DATABASE_NAME,
        process.env.DB_USER_NAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_SERVER,
            dialect: 'mssql',
            port: process.env.DB_PORT,
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
                underscored: false,
                timestamps: false,
            },
        }
    );
    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }
    applyExtraSetup(sequelize);
    return sequelize;
};

module.exports = modelByDBName;
