'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const getQuery = (firmDBname, firmTigerFormat) => {
    return `SELECT
                LOGICALREF id,
                CODE code,
                NAME name,
                GLOBALCODE globalCode
            FROM  ${firmDBname}.dbo.LG_${firmTigerFormat}_UNITSETL `;
};

const getUnits = catchAsync(async (req, res, next) => {
    sequelize
        .query(getQuery(req.firmDBname, req.firmTigerFormat), {
            type: QueryTypes.SELECT,
        })
        .then((units) => {
            res.json(units);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getUnitById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError('Id is required', 400));
    }

    sequelize
        .query(
            getQuery(req.firmDBname, req.firmTigerFormat) +
                ` WHERE LOGICALREF = :id `,
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { id },
            }
        )
        .then((units) => {
            res.json(units);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getItemUnits = catchAsync(async (req, res, next) => {
    const { firmNr, itemId, unitId } = req.query;

    let whereQuery = '';
    if (itemId) {
        whereQuery += ` AND I.ITEMREF =  :itemId`;
    }

    if (unitId) {
        whereQuery += ` AND L.LOGICALREF =  :unitId`;
    }
    sequelize
        .query(
            `SELECT
                I.LOGICALREF id,
                L.LOGICALREF unitId,
                I.ITEMREF itemId,
                L.MAINUNIT mainUnit,
                I.LINENR lineNr,
                I.CONVFACT2 / CASE WHEN ISNULL(I.CONVFACT1,0) = 0 THEN 1 ELSE I.CONVFACT1 END  coefficient,
                I.CONVFACT1 convfact1, I.CONVFACT2 convfact2,
                CASE WHEN I.EXTACCESSFLAGS IN(1,3) THEN 1 ELSE 0 END eActive,
                I.WIDTH width_,
                NULLIF(I.WIDTHREF,0) widthId,
                I.LENGTH length_,
                NULLIF(I.LENGTHREF,0) lengthId,
                I.HEIGHT height_,
                NULLIF(I.HEIGHTREF,0) heightId,
                I.AREA area_,
                NULLIF(I.AREAREF,0) areaId,
                I.VOLUME_ volume_,
                NULLIF(I.VOLUMEREF,0) volumeId,
                I.WEIGHT weight_,
                NULLIF(I.WEIGHTREF,0) weightId,
                I.GROSSVOLUME grossvolume_,
                NULLIF(I.GROSSVOLREF,0) grossvolumeId,
                I.GROSSWEIGHT grossweight_,
                NULLIF(I.GROSSWGHTREF,0) grossweightId
            FROM
                ${req.firmDBname}.dbo.LG_${req.firmTigerFormat}_ITMUNITA I
                LEFT JOIN ${req.firmDBname}.dbo.LG_${req.firmTigerFormat}_UNITSETL L ON L.LOGICALREF = I.UNITLINEREF
                
            WHERE
                L.LOGICALREF IS NOT NULL AND I.ITEMREF IS NOT NULL ${whereQuery}
        `,
            {
                type: QueryTypes.SELECT,
                replacements: { unitId, itemId },
            }
        )
        .then((itemUnits) => {
            res.json(itemUnits);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

module.exports = { getUnits, getItemUnits, getUnitById };
