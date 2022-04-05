'use strict';
const { DataTypes, Op } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      attributes:
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
        'attributes',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            itemId: DataTypes.INTEGER,
            attributeKeyId: DataTypes.INTEGER,
            attributeValueId: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'AGO_ATTRIBUTES',
        }
    );
};
