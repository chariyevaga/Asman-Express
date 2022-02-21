const { Sequelize, Model, DataTypes, Op } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'items',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            code: {
                type: DataTypes.STRING,
            },
            eCode: {
                type: DataTypes.STRING,
            },
            eActive: {
                type: DataTypes.BOOLEAN,
            },
            active: {
                type: DataTypes.BOOLEAN,
            },
            cardType: {
                type: DataTypes.SMALLINT,
            },
            name: {
                type: DataTypes.STRING,
            },
            name2: {
                type: DataTypes.STRING,
            },
            name3: {
                type: DataTypes.STRING,
            },
            stgrpCode: {
                type: DataTypes.STRING,
            },
            specode: {
                type: DataTypes.STRING,
            },
            specode2: {
                type: DataTypes.STRING,
            },
            specode3: {
                type: DataTypes.STRING,
            },
            specode4: {
                type: DataTypes.STRING,
            },
            specode5: {
                type: DataTypes.STRING,
            },
            paretto: {
                type: DataTypes.STRING,
            },
            mainUnit: {
                type: DataTypes.STRING,
            },
            mainUnitId: {
                type: DataTypes.INTEGER,
            },

            brandId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            subsGoodCode: {
                type: DataTypes.STRING,
            },
            reyonCode: DataTypes.STRING,
            salesLimitQuantity: DataTypes.FLOAT,
            nameTm: {
                type: DataTypes.STRING,
            },
            nameEng: {
                type: DataTypes.STRING,
            },
            nameTr: {
                type: DataTypes.STRING,
            },
            nameRu: {
                type: DataTypes.STRING,
            },
            infoTm: {
                type: DataTypes.TEXT,
            },
            infoEng: {
                type: DataTypes.TEXT,
            },
            infoTr: {
                type: DataTypes.TEXT,
            },
            infoRu: {
                type: DataTypes.TEXT,
            },
            keywords: {
                type: DataTypes.TEXT,
            },
            video: DataTypes.TEXT,
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
