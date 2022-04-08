'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      banks:
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
 *              address:
 *                  type: string
 *              address2:
 *                  type: string
 *              city:
 *                  type: string
 *              country:
 *                  type: string
 *              postcode:
 *                  type: string
 *              telNumber:
 *                  type: string
 *              telNumber2:
 *                  type: string
 *              email:
 *                  type: string
 *              webAddress:
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
        'banks',
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
            city: DataTypes.STRING,
            country: DataTypes.STRING,
            postcode: DataTypes.STRING,
            telNumber: DataTypes.STRING,
            telNumber2: DataTypes.STRING,
            email: DataTypes.STRING,
            webAddress: DataTypes.STRING,
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
            tableName: 'AGO_BANKS',
        }
    );
};
