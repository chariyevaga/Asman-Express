'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      currencies:
 *          type: object
 *          required:
 *              - id
 *              - code
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *              symbol:
 *                  type: string
 *              activelyUsed:
 *                  type: boolean
 *              lastRate1:
 *                  type: number
 *                  format: float
 *              lastRate2:
 *                  type: number
 *                  format: float
 *              lastRate3:
 *                  type: number
 *                  format: float
 *              lastRate4:
 *                  type: number
 *                  format: float
 *              lastRateDate:
 *                  type: string
 *                  format: date
 */
module.exports = (sequelize) => {
    sequelize.define(
        'currencies',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            symbol: DataTypes.STRING,
            activelyUsed: DataTypes.BOOLEAN,
            lastRate1: DataTypes.FLOAT,
            lastRate2: DataTypes.FLOAT,
            lastRate3: DataTypes.FLOAT,
            lastRate4: DataTypes.FLOAT,
            lastRateDate: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'AGO_CURRENCIES',
            underscored: false,
            scopes: {
                activelyUsedCurrencies: {
                    where: {
                        activelyUsed: true,
                    },
                },
            },
        }
    );
};
