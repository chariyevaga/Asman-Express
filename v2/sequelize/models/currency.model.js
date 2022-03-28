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
