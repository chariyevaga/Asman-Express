const { Sequelize, Model, DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'brands',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
                key: 'updatedAt',
            },
        },
        {
            sequelize,
            tableName: 'AGO_MM_BRANDS',
            underscored: false,
        }
    );
};
