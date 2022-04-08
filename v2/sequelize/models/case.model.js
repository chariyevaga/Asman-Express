'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      cases:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - name
 *              - currencyId
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *              address:
 *                  type: string
 *              address2:
 *                  type: string
 *              divisionNr:
 *                  type: integer
 *              currencyId:
 *                  type: integer
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
        'cases',
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
            address: DataTypes.STRING,
            address2: DataTypes.STRING,
            divisionNr: DataTypes.INTEGER,
            currencyId: DataTypes.INTEGER,
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
            tableName: 'AGO_CASES',
        }
    );
};
