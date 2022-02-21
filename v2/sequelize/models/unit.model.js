const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'units',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'AGO_MM_UNITS',
        }
    );
};
