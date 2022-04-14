'use strict';

const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      units:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - unitSetId
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *              unitSetId:
 *                  type: integer
 *          example:
 *              id: 5
 *              code: MM
 *              name: Millimeter
 */
module.exports = (sequelize) => {
    sequelize.define(
        'units',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'AGO_UNITS',
        }
    );
};
