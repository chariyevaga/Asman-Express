'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// querys
const unitsQuery = require('../queries/unitsQuery');
const itemUnitsQuery = require('../queries/itemUnitsQuery');

const getUnits = catchAsync(async (req, res, next) => {
    sequelize
        .query(unitsQuery(req.firmDBname, req.firmTigerFormat), {
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
            unitsQuery(req.firmDBname, req.firmTigerFormat) +
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
            itemUnitsQuery(req.firmDBname, req.firmTigerFormat) + whereQuery,
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

module.exports = { getUnits, getItemUnits, getUnitById, itemUnitsQuery };
