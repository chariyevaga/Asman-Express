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
        },
        {
            sequelize,
            tableName: 'AGO_ATTRIBUTE_KEYS',
        }
    );
};
