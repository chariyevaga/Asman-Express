'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      itemAlternatives:
 *          type: object
 *          required:
 *              - id
 *              - itemId
 *              - alternativeItemId
 *          properties:
 *              id:
 *                  type: integer
 *              itemId:
 *                  type: integer
 *                  description: items id
 *              alternativeItemId:
 *                  type: integer
 *                  description: alternative Items id
 *
 */

module.exports = (sequelize) => {
    sequelize.define(
        'itemAlternatives',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            itemId: {
                type: DataTypes.INTEGER,
            },
            alternativeItemId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            tableName: 'AGO_ALTERNATIVES',
        }
    );
};
