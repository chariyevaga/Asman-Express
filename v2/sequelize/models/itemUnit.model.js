'use strict';
const { DataTypes, Op } = require('sequelize');
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
