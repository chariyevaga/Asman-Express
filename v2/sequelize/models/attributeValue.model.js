'use strict';
const { DataTypes, Op } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      attributeValues:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              attributeKeyId:
 *                  type: integer
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 */
module.exports = (sequelize) => {
    sequelize.define(
        'attributeValues',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            attributeKeyId: DataTypes.INTEGER,
            code: DataTypes.STRING,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'AGO_ATTRIBUTE_VALUES',
        }
    );
};
