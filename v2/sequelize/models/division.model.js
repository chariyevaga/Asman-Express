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
            tableName: 'AGO_MM_DIVISIONS',
            underscored: false,
        }
    );
};
