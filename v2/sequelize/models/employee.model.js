const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const { employeeRoles } = require('../../config/otherConfigs');
const {
    formatMobilePhoneNumber,
} = require('../../controllers/functions/telNumber');
const md5 = require('md5');
module.exports = (sequelize) => {
    sequelize.define(
        'employees',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role: {
                type: DataTypes.ENUM(...employeeRoles),
                allowNull: false,
                defaultValue: 'seller',
            },
            image: {
                type: DataTypes.STRING,
            },
            firstName: {
                type: DataTypes.STRING(25),
            },
            lastName: {
                type: DataTypes.STRING(25),
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName}`;
                },
            },
            shortName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName[0]}.`;
                },
            },
            userName: {
                type: DataTypes.STRING(50),
                unique: true,
            },
            password: {
                type: DataTypes.STRING(50),
                set(value) {
                    this.setDataValue('password', md5(value));
                },
                // get() {
                //     return 'Password is encypted';
                // },
            },
            email: {
                type: DataTypes.STRING(50),
            },
            phoneNumber: {
                type: DataTypes.STRING(25),
                set(value) {
                    this.setDataValue(
                        'phoneNumber',
                        formatMobilePhoneNumber(value)
                    );
                },
            },
            divisions: {
                type: DataTypes.TEXT,
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
