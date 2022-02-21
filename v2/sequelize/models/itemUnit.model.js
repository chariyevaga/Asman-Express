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
            widthId: DataTypes.INTEGER,
            length: DataTypes.FLOAT,
            lengthId: DataTypes.INTEGER,
            height: DataTypes.FLOAT,
            heightId: DataTypes.INTEGER,
            area: DataTypes.FLOAT,
            areaId: DataTypes.INTEGER,
            volume: DataTypes.FLOAT,
            volumeId: DataTypes.INTEGER,
            weight: DataTypes.FLOAT,
            weightId: DataTypes.INTEGER,
            grossvolume: DataTypes.FLOAT,
            grossvolumeId: DataTypes.INTEGER,
            grossweight: DataTypes.FLOAT,
            grossweightId: DataTypes.INTEGER,
        },
        {
            sequelize,
            tableName: 'AGO_MM_ITEM_UNITS',
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
