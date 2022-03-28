/**
 * @swagger
 * components:
 *  schemas:
 *      divisions:
 *          type: object
 *          required:
 *              - id
 *              - nr
 *              - name
 *          properties:
 *              id:
 *                  type: int
 *              nr:
 *                  type: int
 *                  description: Division Number. Other models relation via divisions - ***nr***
 *              street:
 *                  type: string
 *              doorNr:
 *                  type: string
 *              district:
 *                  type: string
 *              city:
 *                  type: string
 *              country:
 *                  type: string
 *              zipCode:
 *                  type: string
 *              phone:
 *                  type: string
 *              warehouses:
 *                  type: array
 *                  description: Warehouses list belongs to division. In some API give *include=warehouses* (in query).
 *                  items:
 *                      type: object
 *                      $ref: '#components/schemas/warehouses'
 *
 */

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'divisions',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            nr: DataTypes.INTEGER,
            name: DataTypes.STRING,
            street: DataTypes.STRING,
            doorNr: DataTypes.STRING,
            district: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING,
            zipCode: DataTypes.STRING,
            phone: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'AGO_DIVISIONS',
            underscored: false,
        }
    );
};
