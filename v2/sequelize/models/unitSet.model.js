'use strict';

const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      unitSets:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - name
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
        'unitSets',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            specode: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'AGO_UNIT_SETS',
        }
    );
};
