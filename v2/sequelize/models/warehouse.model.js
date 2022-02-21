const { Sequelize, Model, DataTypes, Op, UUID } = require('sequelize');
const {
    checkMobilePhoneNumber,
    formatMobilePhoneNumber,
} = require('../../controllers/functions/telNumber');

module.exports = (sequelize) => {
    sequelize.define(
        'warehouses',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nr: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            divisionNr: {
                type: DataTypes.INTEGER,
            },
            factoryNr: {
                type: DataTypes.INTEGER,
            },
            costGrp: {
                type: DataTypes.INTEGER,
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
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
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
