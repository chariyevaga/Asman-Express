'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      serviceCards:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - name
 *              - unitId
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Primary key
 *              code:
 *                  type: string
 *              unitId:
 *                  type: integer
 *              cyphcode:
 *                  type: string
 *              specode:
 *                  type: string
 *              specode2:
 *                  type: string
 *              specode3:
 *                  type: string
 *              specode4:
 *                  type: string
 *              specode5:
 *                  type: string
 *              name:
 *                  type: string
 *              type:
 *                  type: integer
 *                  description: 1.service received, 2.service provided
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 */
module.exports = (sequelize) => {
    sequelize.define(
        'serviceCards',
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
            unitId: DataTypes.INTEGER,
            cyphcode: DataTypes.STRING,
            specode: DataTypes.STRING,
            specode2: DataTypes.STRING,
            specode3: DataTypes.STRING,
            specode4: DataTypes.STRING,
            specode5: DataTypes.STRING,
            type: DataTypes.INTEGER,
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: 'AGO_SERVICE_CARDS',
        }
    );
};
