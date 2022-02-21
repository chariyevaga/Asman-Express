const { Sequelize, Model, DataTypes, Op, UUID } = require('sequelize');
const {
    checkMobilePhoneNumber,
    formatMobilePhoneNumber,
} = require('../../controllers/functions/telNumber');
const warehouses = require('./warehouse.model');
const { divisionTypes } = require('../../config/otherConfigs');
module.exports = (sequelize) => {
    sequelize.define(
        'divisions',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: DataTypes.STRING(25),
                defaultValue: Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    .substr(0, 5),
                unique: true,
            },
            nr: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(50),
                defaultValue: Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    .substr(0, 5),
                allowNull: false,
                unique: true,
            },
            address: {
                type: DataTypes.STRING(250),
            },
            latitude: {
                type: DataTypes.FLOAT,
                defaultValue: 37.96059,
            },
            longitude: {
                type: DataTypes.FLOAT,
                defaultValue: 58.41587,
            },
            image: {
                type: DataTypes.STRING,
            },
            warehouses: {
                type: DataTypes.STRING,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                required: true,
            },
            phoneNumber2: {
                type: DataTypes.STRING,
            },
            phoneNumber3: {
                type: DataTypes.STRING,
            },
            instagram: {
                type: DataTypes.STRING,
            },
            telegram: {
                type: DataTypes.STRING,
            },
            imo: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            defaultWarehouse: {
                type: DataTypes.INTEGER,
            },
            clientId: {
                type: DataTypes.INTEGER,
            },
            discountForProductId: {
                type: DataTypes.INTEGER,
            },
            discountForClientId: {
                type: DataTypes.INTEGER,
            },
            discountForReceiptId: {
                type: DataTypes.INTEGER,
            },
            type: {
                type: DataTypes.ENUM(...divisionTypes),
                defaultValue: 'B2C',
            },

            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            scopes: {
                active: {
                    where: {
                        active: true,
                    },
                },
                passive: {
                    where: {
                        active: false,
                    },
                },
            },
        }
    );
};
