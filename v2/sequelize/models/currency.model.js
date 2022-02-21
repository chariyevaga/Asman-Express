const { Sequelize, Model, DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'currencies',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            symbol: DataTypes.STRING,
            activelyUsed: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            tableName: 'AGO_MM_CURRENCIES',
            underscored: false,
            scopes: {
                activelyUsedCurrencies: {
                    where: {
                        activelyUsed: true,
                    },
                },
            },
        }
    );
};
