'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      bankAccounts:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *              accountNo:
 *                  type: string
 *              specode:
 *                  type: string
 *              active:
 *                  type: boolean
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 */
module.exports = (sequelize) => {
    sequelize.define(
        'bankAccounts',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            bankId: DataTypes.INTEGER,
            currencyId: DataTypes.INTEGER,
            code: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            accountNo: DataTypes.STRING,
            specode: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: 'AGO_BANK_ACCOUNTS',
        }
    );
};
