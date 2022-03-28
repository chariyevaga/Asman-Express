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
 *              rates1:
 *                  type: number
 *                  format: float
 *              rates2:
 *                  type: number
 *                  format: float
 *              rates3:
 *                  type: number
 *                  format: float
 *              rates4:
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
            rates1: DataTypes.FLOAT,
            rates2: DataTypes.FLOAT,
            rates3: DataTypes.FLOAT,
            rates4: DataTypes.FLOAT,
        },
        {
            sequelize,
            tableName: 'AGO_EXCHANGES',
            underscored: false,
        }
    );
};
