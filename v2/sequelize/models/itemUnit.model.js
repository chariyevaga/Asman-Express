'use strict';
const { DataTypes, Op } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      itemUnits:
 *          description: ItemUnits
 *          type: object
 *          required:
 *              - id
 *              - unitId
 *              - itemId
 *          properties:
 *              id:
 *                  type: integer
 *              unitId:
 *                  type: integer
 *              itemId:
 *                  type: integer
 *              mainUnit:
 *                  type: boolean
 *              lineNr:
 *                  type: integer
 *              coefficient:
 *                  type: number
 *                  format: float
 *              eActive:
 *                  type: boolean
 *              width:
 *                  type: number
 *                  format: float
 *              widthUnit:
 *                  type: string
 *              length:
 *                  type: number
 *                  format: float
 *              lengthUnit:
 *                  type: string
 *              height:
 *                  type: number
 *                  format: float
 *              heightUnit:
 *                  type: string
 *              area:
 *                  type: number
 *                  format: float
 *              areaUnit:
 *                  type: string
 *              volume:
 *                  type: number
 *                  format: float
 *              volumeUnit:
 *                  type: string
 *              weight:
 *                  type: number
 *                  format: float
 *              weightUnit:
 *                  type: string
 *              grossvolume:
 *                  type: number
 *                  format: float
 *              grossvolumeUnit:
 *                  type: string
 *              grossweight:
 *                  type: number
 *                  format: float
 *              grossweightUnit:
 *                  type: string
 *
 */
module.exports = (sequelize) => {
    sequelize.define(
        'itemUnits',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            unitId: DataTypes.INTEGER,
            itemId: DataTypes.INTEGER,
            mainUnit: DataTypes.BOOLEAN,
            lineNr: DataTypes.SMALLINT,
            coefficient: DataTypes.FLOAT,
            eActive: DataTypes.BOOLEAN,
            width: DataTypes.FLOAT,
            widthUnit: DataTypes.STRING,
            length: DataTypes.FLOAT,
            lengthUnit: DataTypes.STRING,
            height: DataTypes.FLOAT,
            heightUnit: DataTypes.STRING,
            area: DataTypes.FLOAT,
            areaUnit: DataTypes.STRING,
            volume: DataTypes.FLOAT,
            volumeUnit: DataTypes.STRING,
            weight: DataTypes.FLOAT,
            weightUnit: DataTypes.STRING,
            grossvolume: DataTypes.FLOAT,
            grossvolumeUnit: DataTypes.STRING,
            grossweight: DataTypes.FLOAT,
            grossweightUnit: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'AGO_ITEM_UNITS',
            scopes: {
                active: {
                    where: {
                        [Op.or]: [{ eActive: true }, { mainUnit: true }],
                    },
                },
            },
        }
    );
};
