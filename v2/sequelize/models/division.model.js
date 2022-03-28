'use strict';
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
 *                  type: integer
 *              nr:
 *                  type: integer
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
