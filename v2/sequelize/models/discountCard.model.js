'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      discountCards:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - name
 *              - unitId
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key
 *              code:
 *                  type: string
 *              cyphcode:
 *                  type: string
 *              specode:
 *                  type: string
 *              name:
 *                  type: string
 *              type:
 *                  type: integer
 *                  description: 1. Buy Discount,  2. Sales Discount,  3. Purchase Cost, 4. Sales Cost
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 */
module.exports = (sequelize) => {
    sequelize.define(
        'discountCards',
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

            cyphcode: DataTypes.STRING,
            specode: DataTypes.STRING,
            type: DataTypes.INTEGER,
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: 'AGO_DISCOUNT_CARDS',
        }
    );
};
