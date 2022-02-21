const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define(
        'clients',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            active: DataTypes.BOOLEAN,
            cardType: DataTypes.INTEGER,
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            name2: DataTypes.STRING,
            eCode: DataTypes.STRING,
            address: DataTypes.TEXT,
            address2: DataTypes.TEXT,
            district: DataTypes.STRING,
            town: DataTypes.STRING,
            city: DataTypes.STRING,
            cityCode: DataTypes.STRING,
            contry: DataTypes.STRING,
            contryCode: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            phoneNumber2: DataTypes.STRING,
            email: DataTypes.STRING,
            email2: DataTypes.STRING,
            email3: DataTypes.STRING,
            incharge: DataTypes.STRING,
            incharge2: DataTypes.STRING,
            incharge3: DataTypes.STRING,
            webAddress: DataTypes.STRING,
            birthDate: DataTypes.DATEONLY,
            exchangeRateType: DataTypes.SMALLINT,
            discount: DataTypes.SMALLINT,
            specode: DataTypes.STRING,
            specode2: DataTypes.STRING,
            specode3: DataTypes.STRING,
            specode4: DataTypes.STRING,
            specode5: DataTypes.STRING,
            cyphcode: DataTypes.STRING,
            cardNo: DataTypes.STRING,
            guid: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: 'AGO_MM_CLIENTS',
            underscored: false,
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
