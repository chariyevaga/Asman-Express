const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const { employeeRoles } = require('../../config/otherConfigs');
const {
    formatMobilePhoneNumber,
} = require('../../controllers/functions/telNumber');
const md5 = require('md5');
module.exports = (sequelize) => {
    sequelize.define(
        'tigerEmployees',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            phoneNumber: DataTypes.STRING(25),
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
