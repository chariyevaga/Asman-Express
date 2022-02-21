const { Sequelize, Model, DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'stocks',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            itemId: DataTypes.INTEGER,
            warehouseNr: DataTypes.INTEGER,
            onhand: DataTypes.FLOAT,
            reserved: DataTypes.FLOAT,
        },
        {
            sequelize,
        }
    );
};
