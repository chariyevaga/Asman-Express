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
 *              lineNumber:
 *                  type: integer
 *              priority:
 *                  type: integer
 *              maxQuantity:
 *                  type: number
 *                  format: float
 *              minQuantity:
 *                  type: number
 *                  format: float
 *              beginDate:
 *                  type: string
 *                  format: date
 *              endDate:
 *                  type: string
 *                  format: date
 *              divisionNr:
 *                  type: integer
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
            lineNumber: DataTypes.SMALLINT,
            priority: DataTypes.SMALLINT,
            maxQuantity: DataTypes.FLOAT,
            minQuantity: DataTypes.FLOAT,
            beginDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'AGO_ALTERNATIVES',
        }
    );
};
