'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      itemCrossSales:
 *          discription: AGO_CROSS_SALES view
 *          type: object
 *          required:
 *              - id
 *              - itemId
 *              - crossSaleItemId
 *          properties:
 *              id:
 *                  type: integer
 *              itemId:
 *                  type: integer
 *                  description: items id
 *              crossSaleItemId:
 *                  type: integer
 *                  description: crossSale Items id
 *
 */

module.exports = (sequelize) => {
    sequelize.define(
        'itemCrossSales',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            itemId: {
                type: DataTypes.INTEGER,
            },
            crossSaleItemId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            tableName: 'AGO_CROSS_SALES',
        }
    );
};
