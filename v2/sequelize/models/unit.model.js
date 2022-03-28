/**
 * @swagger
 * components:
 *  schemas:
 *      units:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - name
 *          properties:
 *              id:
 *                  type: int
 *              code:
 *                  type: string
 *              name:
 *                  type: string
 *          example:
 *              id: 5
 *              code: MM
 *              name: Millimeter
 */

const { DataTypes } = require('sequelize');
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
