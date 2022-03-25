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
 *                  type: int
 *              nr:
 *                  type: int
 *                  description: Division Number. Other models relation via divisions - ***nr***
 *              division:
 *                  type: object
 *                  description: Warehouse belongs to divison. API give *include=division* (in query). **ForeignKey:divisionNr**
 *                  $ref: '#/components/schemas/divisions'
 */

const { DataTypes } = require('sequelize');
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
            tableName: 'AGO_MM_WAREHOUSES',
        }
    );
};
