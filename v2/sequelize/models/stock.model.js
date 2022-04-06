'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    /**
     * @swagger
     * components:
     *  schemas:
     *      stocks:
     *          type: object
     *          required:
     *              - itemId
     *              - warehouseNr
     *              - onhand
     *          properties:
     *              itemId:
     *                  type: integer
     *              warehouseNr:
     *                  type: integer
     *                  description: Warehouses nr
     *              onhand:
     *                  type: number
     *                  format: float
     *                  description: Item amount by warehouse
     *              reserved:
     *                  type: number
     *                  format: float
     */
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
