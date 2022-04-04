'use strict';
const { DataTypes } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      warehouses:
 *          discription: AGO_WAREHOUSES view
 *          type: object
 *          required:
 *              - id
 *              - nr
 *              - name
 *              - divisionNr
 *          properties:
 *              id:
 *                  type: integer
 *              nr:
 *                  type: integer
 *                  description: Warehouse Number. Other models relation via divisions - ***nr***
 *              name:
 *                  type: string
 *              divisionNr:
 *                  type: integer
 *                  description: Division Number.Warehouse belongsTo division. ForeignKey:*divisionNr* ***(warehouses.divisionNr = division.nr)***
 *              factoryNr:
 *                  type: integer
 *              costGrp:
 *                  type: integer
 */

module.exports = (sequelize) => {
    sequelize.define(
        'warehouses',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            nr: {
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING(50),
            divisionNr: DataTypes.INTEGER,
            factoryNr: DataTypes.INTEGER,
            costGrp: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'AGO_WAREHOUSES',
        }
    );
};
