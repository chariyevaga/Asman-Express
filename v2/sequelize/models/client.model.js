'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    /**
     * @swagger
     * components:
     *  schemas:
     *      clients:
     *          type: object
     *          required:
     *              - id
     *              - code
     *              - name
     *          properties:
     *              id:
     *                  type: integer
     *                  description: Primary key
     *              code:
     *                  type: string
     *              name:
     *                  type: string
     *              name2:
     *                  type: string
     *              active:
     *                  type: boolean
     *              cardType:
     *                  type: integer
     *                  description: 1 - buyer, 2 - seller, 3 - buyer and seller
     *              eCode:
     *                  type: string
     *              address:
     *                  type: string
     *              address2:
     *                  type: string
     *              district:
     *                  type: string
     *              town:
     *                  type: string
     *              city:
     *                  type: string
     *              cityCode:
     *                  type: string
     *              country:
     *                  type: string
     *              countryCode:
     *                  type: string
     *              phoneNumber:
     *                  type: string
     *              phoneNumber2:
     *                  type: string
     *              email:
     *                  type: string
     *              email2:
     *                  type: string
     *              email3:
     *                  type: string
     *              incharge:
     *                  type: string
     *              incharge2:
     *                  type: string
     *              incharge3:
     *                  type: string
     *              webAddress:
     *                  type: string
     *              birthDate:
     *                  type: string
     *                  format: date
     *              exchangeRateType:
     *                  type: integer
     *                  description: Exchange Rate type (rate1, rate2 ...)
     *              discount:
     *                  type: integer
     *              specode:
     *                  type: string
     *              specode2:
     *                  type: string
     *              specode3:
     *                  type: string
     *              specode4:
     *                  type: string
     *              specode5:
     *                  type: string
     *              cyphcode:
     *                  type: string
     *              cardNo:
     *                  type: string
     *              guid:
     *                  type: string
     *              createdAt:
     *                  type: string
     *                  format: date-time
     *              updatedAt:
     *                  type: string
     *                  format: date-time
     */
    sequelize.define(
        'clients',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement: true,
            },
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            name2: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            cardType: DataTypes.INTEGER,
            eCode: DataTypes.STRING,
            address: DataTypes.TEXT,
            address2: DataTypes.TEXT,
            district: DataTypes.STRING,
            town: DataTypes.STRING,
            city: DataTypes.STRING,
            cityCode: DataTypes.STRING,
            country: DataTypes.STRING,
            countryCode: DataTypes.STRING,
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
            createdAt: DataTypes.DATE,
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'AGO_CLIENTS',
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
