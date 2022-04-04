'use strict';
const { DataTypes, Op } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      items:
 *          type: object
 *          required:
 *              - id
 *              - code
 *              - active
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *              code:
 *              eCode:
 *                  type: string
 *              active:
 *                  type: boolean
 *              eActive:
 *                  type: boolean
 *              cardType:
 *                  type: integer
 *              name:
 *                  type: string
 *              name2:
 *                  type: string
 *              name3:
 *                  type: string
 *              name4:
 *                  type: string
 *              specode1:
 *                  type: string
 *              specode2:
 *                  type: string
 *              specode3:
 *                  type: string
 *              specode4:
 *                  type: string
 *              specode5:
 *                  type: string
 *              keyword1:
 *                  type: string
 *              keyword2:
 *                  type: string
 *              keyword3:
 *                  type: string
 *              keyword4:
 *                  type: string
 *              keyword5:
 *                  type: string
 *              origin:
 *                  type: string
 *              category:
 *                  type: string
 *              mainUnit:
 *                  type: string
 *              mainUnitId:
 *                  type: integer
 *              brandId:
 *                  type: integer
 *              subsGoodCode:
 *                  type: string
 *              reyonCode:
 *                  type: string
 *              salesLimitQuantity:
 *                  type: number
 *              status:
 *                  type: string
 */
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
            name3: DataTypes.STRING,
            name4: DataTypes.STRING,
            specode1: DataTypes.STRING,
            specode2: DataTypes.STRING,
            specode3: DataTypes.STRING,
            specode4: DataTypes.STRING,
            specode5: DataTypes.STRING,
            keyword1: DataTypes.STRING,
            keyword2: DataTypes.STRING,
            keyword3: DataTypes.STRING,
            keyword4: DataTypes.STRING,
            keyword5: DataTypes.STRING,
            origin: DataTypes.STRING,
            category: DataTypes.STRING,
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
