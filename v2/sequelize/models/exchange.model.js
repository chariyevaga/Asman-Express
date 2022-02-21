const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'exchanges',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            date: DataTypes.DATE,
            currencyId: DataTypes.INTEGER,
            rates1: DataTypes.FLOAT,
            rates2: DataTypes.FLOAT,
            rates3: DataTypes.FLOAT,
            rates4: DataTypes.FLOAT,
        },
        {
            sequelize,
            tableName: 'AGO_MM_EXCHANGES',
            underscored: false,
        }
    );
};
