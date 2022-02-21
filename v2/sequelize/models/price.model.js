const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'prices',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            code: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            price: DataTypes.FLOAT,
            currencyId: DataTypes.INTEGER,
            itemId: DataTypes.INTEGER,
            priority: DataTypes.SMALLINT,
            clentcode: DataTypes.STRING,
            clcyphcode: DataTypes.STRING,
            clspecode: DataTypes.STRING,
            clspecode1: DataTypes.STRING,
            clspecode2: DataTypes.STRING,
            clspecode3: DataTypes.STRING,
            clspecode4: DataTypes.STRING,
            clspecode5: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            beginDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            divisions: DataTypes.STRING,
        },
        {
            sequelize,
            scopes: {
                active: {
                    where: {
                        active: true,
                    },
                },
                passive: {
                    where: {
                        active: false,
                    },
                },
            },
        }
    );
};
