'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const itemsQuery = require('../queries/itemsQuery');
const itemUnitsQuery = require('../queries/itemUnitsQuery');
const barcodesQuery = require('../queries/barcodesQuery');

const getItems = catchAsync(async (req, res, next) => {
    sequelize
        .query(itemsQuery(req.firmDBname, req.firmTigerFormat), {
            type: QueryTypes.SELECT,
        })
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getItemById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        next(new AppError('Id is required', 400));
    }
    // GET DATABASE NAME

    sequelize
        .query(
            itemsQuery(req.firmDBname, req.firmTigerFormat) +
                ' AND ITM.LOGICALREF = :id',
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { id },
            }
        )
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getItemUnitsByItemId = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        next(new AppError('Id is required', 400));
    }
    // GET DATABASE NAME

    sequelize
        .query(
            itemUnitsQuery(req.firmDBname, req.firmTigerFormat) +
                ' AND I.ITEMREF = :id',
            {
                replacements: { id },
                type: QueryTypes.SELECT,
            }
        )
        .then((itemUnits) => {
            res.json(itemUnits);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getBarcodesByItemId = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        next(new AppError('Id is required', 400));
    }
    // GET DATABASE NAME

    sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) +
                ' WHERE ITEMREF = :id',
            {
                replacements: { id },
                type: QueryTypes.SELECT,
            }
        )
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});
module.exports = {
    getItems,
    getItemById,
    getItemUnitsByItemId,
    getBarcodesByItemId,
};
