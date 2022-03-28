'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const stocks = sequelize.define(
        'stocks',
        {
            itemId: DataTypes.INTEGER,
            warehouseNr: DataTypes.INTEGER,
            onhand: DataTypes.FLOAT,
            reserved: DataTypes.FLOAT,
        },
        {
            sequelize,
            tableName: 'AGO_STOCKS',
            freezeTableName: true,
        }
    );
    stocks.removeAttribute('id');
    return stocks;
};
