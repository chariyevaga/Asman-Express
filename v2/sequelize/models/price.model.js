const { DataTypes, Op, Sequelize } = require('sequelize');
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
            itemId: DataTypes.INTEGER,
            priority: DataTypes.SMALLINT,
            clentcode: DataTypes.STRING,
            clcyphcode: DataTypes.STRING,
            clspecode: DataTypes.STRING,
            clspecode2: DataTypes.STRING,
            clspecode3: DataTypes.STRING,
            clspecode4: DataTypes.STRING,
            clspecode5: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            divisions: DataTypes.STRING,
            price: DataTypes.FLOAT,
            type: DataTypes.SMALLINT, // 2 - sale price, 1 - purchase price
            currencyId: DataTypes.INTEGER,
            beginTime: DataTypes.DATE,
            endTime: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: 'AGO_PRICES',
            scopes: {
                currentSalePrices: {
                    where: {
                        active: true,
                        beginTime: {
                            [Op.lte]: Sequelize.fn('GETDATE'),
                        },
                        endTime: {
                            [Op.gt]: Sequelize.fn('GETDATE'),
                        },
                        type: 2,
                        clentcode: '',
                        clcyphcode: '',
                        clspecode: '',
                        clspecode2: '',
                        clspecode3: '',
                        clspecode4: '',
                        clspecode5: '',
                    },
                    order: ['priority', ['id', 'desc']],
                },
                allSalePrices: {
                    where: {
                        active: true,
                        type: 2,
                    },
                },

                purchasePrices: {
                    where: {
                        active: true,
                        type: 1,
                    },
                },
            },
        }
    );
};
