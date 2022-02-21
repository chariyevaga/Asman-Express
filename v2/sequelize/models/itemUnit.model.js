const { Sequelize, Model, DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'itemUnit',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            unitId: {
                type: DataTypes.INTEGER,
            },
            itemId: {
                type: DataTypes.INTEGER,
            },
            mainUnit: {
                type: DataTypes.BOOLEAN,
            },
            lineNr: {
                type: DataTypes.SMALLINT,
            },
            coefficient: {
                type: DataTypes.FLOAT,
            },
            eActive: {
                type: DataTypes.BOOLEAN,
            },
            barcode: {
                type: DataTypes.STRING,
            },
            barcode2: {
                type: DataTypes.STRING,
            },
            barcode3: {
                type: DataTypes.STRING,
            },
            width_: {
                type: DataTypes.FLOAT,
            },
            widthId: {
                type: DataTypes.INTEGER,
            },
            length_: {
                type: DataTypes.FLOAT,
            },
            lengthId: {
                type: DataTypes.INTEGER,
            },
            height_: {
                type: DataTypes.FLOAT,
            },
            heightId: {
                type: DataTypes.INTEGER,
            },
            area_: {
                type: DataTypes.FLOAT,
            },
            areaId: {
                type: DataTypes.INTEGER,
            },
            volume_: {
                type: DataTypes.FLOAT,
            },
            volumeId: {
                type: DataTypes.INTEGER,
            },
            weight_: {
                type: DataTypes.FLOAT,
            },
            weightId: {
                type: DataTypes.INTEGER,
            },
            grossvolume_: {
                type: DataTypes.FLOAT,
            },
            grossvolumeId: {
                type: DataTypes.INTEGER,
            },
            grossweight_: {
                type: DataTypes.FLOAT,
            },
            grossweightId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            tableName: 'itemUnit',
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
