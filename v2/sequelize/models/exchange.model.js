'use strict';
const { DataTypes } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      exchanges:
 *          type: object
 *          required:
 *              - id
 *              - date
 *              - currencyId
 *          properties:
 *              id:
 *                  type: integer
 *              date:
 *                  type: string
 *                  format: date
 *              currencyId:
 *                  type: integer
 *                  description: Currency Id. ForeigneKey *currencyId* **(currencies.id = exhcanges.currencyId)**
 *              rate1:
 *                  type: number
 *                  format: float
 *              rate2:
 *                  type: number
 *                  format: float
 *              rate3:
 *                  type: number
 *                  format: float
 *              rate4:
 *                  type: number
 *                  format: float
 */

module.exports = (sequelize) => {
    sequelize.define(
        'exchanges',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            date: DataTypes.DATE,
            currencyId: DataTypes.INTEGER,
            rate1: DataTypes.FLOAT,
            rate2: DataTypes.FLOAT,
            rate3: DataTypes.FLOAT,
            rate4: DataTypes.FLOAT,
        },
        {
            sequelize,
            tableName: 'AGO_EXCHANGES',
            underscored: false,
        }
    );
};
