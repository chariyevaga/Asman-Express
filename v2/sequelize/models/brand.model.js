const { DataTypes } = require('sequelize');
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
            },
        },
        {
            sequelize,
            tableName: 'AGO_BRANDS',
        }
    );
};
