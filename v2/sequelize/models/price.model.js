'use strict';
const { DataTypes, Op, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
    /**
     * @swagger
     * components:
     *  schemas:
     *      prices:
     *          type: object
     *          required:
     *              - id
     *              - code
     *              - itemId
     *              - price
     *          properties:
     *              id:
     *                  type: integer
     *              code:
     *                  type: integer
     *              itemId:
     *                  type: integer
     *              priority:
     *                  type: integer
     *              clentcode:
     *                  type: string
     *              clcyphcode:
     *                  type: string
     *              clspecode:
     *                  type: string
     *              clspecode2:
     *                  type: string
     *              clspecode3:
     *                  type: string
     *              clspecode4:
     *                  type: string
     *              clspecode5:
     *                  type: string
     *              active:
     *                  type: boolean
     *              divisions:
     *                  type: array
     *                  items:
     *                      type: integer
     *                      description: division nr
     *              price:
     *                  type: string
     *              type:
     *                  type: integer
     *                  description: >
     *                      Price Type:
     *                      - 1. purchase price
     *                      - 2. sale price
     *              unitId:
     *                  type: integer
     *                  description: Unit id
     *              currencyId:
     *                  type: integer
     *                  description: Price currency id
     *              beginTime:
     *                  type: string
     *                  format: date
     *                  description: Price start date
     *              endTime:
     *                  type: string
     *                  format: date
     *                  description: Price end date
     *              createdAt:
     *                  type: string
     *                  format: date-time
     *              updatedAt:
     *                  type: string
     *                  format: date-time
     */
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
            unitId: DataTypes.INTEGER,
            currencyId: DataTypes.INTEGER,
            beginTime: DataTypes.DATE,
            endTime: DataTypes.DATE,
            createdAt: DataTypes.DATE,
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
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
