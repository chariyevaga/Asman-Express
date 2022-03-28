'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      barcodes:
 *          type: object
 *          required:
 *              - id
 *              - itemId
 *              - itemUnitId
 *              - unitId
 *              - barcode
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key
 *              itemId:
 *                  type: integer
 *                  description: Item Id. ForeigneKey itemId ***(barcodes.itemId = items.id)***
 *              itemUnitId:
 *                  type: integer
 *                  description: ItemUnits Id. ForeigneKey itemUnitId ***(barcodes.itemUnitId = itemUnits.id)***
 *              unitId:
 *                  type: integer
 *                  description: Unit Id. ForeigneKey unitId ***(barcodes.unitId = units.id)***
 *              lineNr:
 *                  type: integer
 *                  description: barcode order line
 *              barcode:
 *                  type: string
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 */
module.exports = (sequelize) => {
    sequelize.define(
        'barcodes',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            itemId: DataTypes.INTEGER,
            itemUnitId: DataTypes.INTEGER,
            unitId: DataTypes.INTEGER,
            lineNr: DataTypes.SMALLINT,
            barcode: DataTypes.STRING(25),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'AGO_BARCODES',
        }
    );
};
