'use strict';
const { DataTypes, Op } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      attributeKeys:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *              specode:
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
        'attributeKeys',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            specode: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'AGO_ATTRIBUTE_KEYS',
        }
    );
};
