'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// querys
const barcodesQuery = require('../queries/barcodesQuery');
const stockQuery = require('../queries/stockQuery');

const { getItemById, getItemUnitsById } = require('./itemControllers');
const { getUnitById, getItemUnits } = require('./unitControllers');

const getBarcodes = catchAsync(async (req, res, next) => {
    const { barcode, itemId, itemUnitId, unitId, id } = req.query;
    let whereQuery = '';

    if (id) {
        whereQuery += ' AND UNITBARCODE.LOGICALREF = :id ';
    } else {
        if (barcode) {
            whereQuery += ' AND UNITBARCODE.BARCODE = :barcode ';
        }

        if (itemId) {
            whereQuery += ' AND UNITBARCODE.ITEMREF = :itemId ';
        }

        if (unitId) {
            whereQuery += ' AND UNITBARCODE.UNITLINEREF = :unitId ';
        }

        if (itemUnitId) {
            whereQuery += ' AND UNITBARCODE.ITMUNITAREF = :itemUnitId ';
        }
    }

    sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) + whereQuery,
            {
                type: QueryTypes.SELECT,
                replacements: { barcode, itemId, itemUnitId, unitId, id },
                plain: Boolean(barcode) || Boolean(id),
            }
        )
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getBarcodeById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError('Id is required', 400));
    }

    sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) +
                ` AND UNITBARCODE.LOGICALREF = :id `,
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { id },
            }
        )
        .then((barcode) => {
            res.json(barcode);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getItemByBarcode = catchAsync(async (req, res, next) => {
    const { barcode } = req.params;
    if (!barcode) {
        next(new AppError('barcode is required', 400));
    }

    sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) +
                ` AND UNITBARCODE.BARCODE = :barcode `,
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { barcode },
            }
        )
        .then((barcode) => {
            if (!barcode?.itemId) {
                next(new AppError(`Barcode ${barcode} not found`, 400));
            }
            req.params.id = barcode?.itemId;
            getItemById(req, res, next);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getUnitByBarcode = catchAsync(async (req, res, next) => {
    const { barcode } = req.params;
    if (!barcode) {
        next(new AppError('barcode is required', 400));
    }

    sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) +
                ` AND UNITBARCODE.BARCODE = :barcode `,
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { barcode },
            }
        )
        .then((barcode) => {
            if (!barcode?.unitId) {
                next(new AppError(`Barcode ${barcode} not found`, 400));
            }
            req.params.id = barcode?.unitId;
            getUnitById(req, res, next);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getItemUnitByBarcode = catchAsync(async (req, res, next) => {
    const { barcode } = req.params;
    if (!barcode) {
        next(new AppError('barcode is required', 400));
    }

    sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) +
                ` AND UNITBARCODE.BARCODE = :barcode `,
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { barcode },
            }
        )
        .then((barcode) => {
            if (!barcode?.itemUnitId) {
                next(new AppError(`Barcode ${barcode} not found`, 400));
            }
            req.query.id = barcode?.itemUnitId;
            getItemUnits(req, res, next);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getStocksByBarcode = catchAsync(async (req, res, next) => {
    const { barcode } = req.params;
    if (!barcode) {
        next(new AppError('barcode is required', 400));
    }

    const itemId = await sequelize
        .query(
            barcodesQuery(req.firmDBname, req.firmTigerFormat) +
                ` AND UNITBARCODE.BARCODE = :barcode `,
            {
                plain: true,
                type: QueryTypes.SELECT,
                replacements: { barcode },
            }
        )
        .then((barcode) => barcode?.itemId)
        .catch((err) => {
            next(new AppError(err, 500));
        });

    if (!itemId) {
        next(new AppError('Barcode not found', 404));
    }
    sequelize
        .query(
            stockQuery(
                req.firmDBname,
                req.firmTigerFormat,
                req.donemTigerFormat
            ) + ' AND GNTOTST.STOCKREF = :itemId ',
            {
                type: QueryTypes.SELECT,
                replacements: { itemId },
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
    getBarcodes,
    getBarcodeById,
    getItemByBarcode,
    getUnitByBarcode,
    getItemUnitByBarcode,
    getStocksByBarcode,
};
