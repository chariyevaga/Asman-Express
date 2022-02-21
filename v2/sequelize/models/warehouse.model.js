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
