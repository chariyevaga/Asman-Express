'use strict';
const { DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'items',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            code: DataTypes.STRING,
            eCode: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            eActive: DataTypes.BOOLEAN,
            cardType: DataTypes.SMALLINT,
            name: DataTypes.STRING,
            name2: DataTypes.STRING,
            gender: DataTypes.STRING,
            generation: DataTypes.STRING,
            size: DataTypes.STRING,
            season: DataTypes.STRING,
            activeSeason: DataTypes.STRING,
            variationCode: DataTypes.STRING,
            category: DataTypes.STRING,
            color: DataTypes.STRING,
            mainUnit: DataTypes.STRING,
            mainUnitId: DataTypes.INTEGER,
            brandId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            subsGoodCode: DataTypes.STRING,
            reyonCode: DataTypes.STRING,
            salesLimitQuantity: DataTypes.FLOAT,
            status: {
                type: DataTypes.VIRTUAL,
                get() {
                    if (this.eActive && this.active) {
                        return 'active';
                    } else {
                        return 'passive';
                    }
                },
            },
        },
        {
            sequelize,
            tableName: 'AGO_ITEMS',
            scopes: {
                active: {
                    where: {
                        [Op.and]: {
                            active: true,
                            eActive: true,
                        },
                    },
                },
                passive: {
                    where: {
                        [Op.or]: [
                            {
                                active: false,
                            },
                            {
                                eActive: false,
                            },
                        ],
                    },
                },
            },
        }
    );
};
