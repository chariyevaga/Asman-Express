'use strict';
const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const itemsQuery = require('../queries/itemsQuery');
const itemUnitsQuery = require('../queries/itemUnitsQuery');
const barcodesQuery = require('../queries/barcodesQuery');
const stockQuery = require('../queries/stockQuery');

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
                ' AND ITEMS.LOGICALREF = :id',
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
                ' AND ITMUNITA.ITEMREF = :id',
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
                ' AND UNITBARCODE.ITEMREF = :id',
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

const getStockByItemId = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError('Id is required', 400));
    }

    if (!req.donemTigerFormat) {
        next(new AppError('Donem is required', 400));
    }
    sequelize
        .query(
            stockQuery(
                req.firmDBname,
                req.firmTigerFormat,
                req.donemTigerFormat
            ) + ' AND GNTOTST.STOCKREF = :id ',
            {
                type: QueryTypes.SELECT,
                replacements: { id },
            }
        )
        .then((stocks) => {
            res.json(stocks);
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
    getStockByItemId,
};
