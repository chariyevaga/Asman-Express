const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'barcodes',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            itemId: DataTypes.INTEGER,
            itemUnitId: DataTypes.INTEGER,
            unitId: DataTypes.INTEGER,
            lineNr: DataTypes.SMALLINT,
            barcode: DataTypes.STRING(25),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'AGO_BARCODES',
        }
    );
};
