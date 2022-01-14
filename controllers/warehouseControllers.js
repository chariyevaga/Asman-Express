'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const warehousesQuery = require('../queries/warehousesQuery');
const stockQuery = require('../queries/stockQuery');

const getWarehouses = catchAsync(async (req, res, next) => {
    const { nr, id } = req.query;
    let whereQuery = '';
    if (nr) {
        whereQuery += ' AND CAPIWHOUSE.NR = :nr ';
    }

    if (id) {
        whereQuery += ' AND CAPIWHOUSE.LOGICALREF = :id';
    }

    sequelize
        .query(warehousesQuery(req.firmNr) + whereQuery, {
            type: QueryTypes.SELECT,
            replacements: { id, nr },
            plain: id || nr,
        })
        .then((warehouses) => {
            res.json(warehouses);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getWarehouseByNr = catchAsync(async (req, res, next) => {
    const { nr } = req.params;
    if (!nr) {
        next(new AppError('Nr is required', 400));
    }

    sequelize
        .query(warehousesQuery(req.firmNr) + ' AND CAPIDIV.NR = :nr ', {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: { nr },
        })
        .then((warehouse) => {
            res.json(warehouse);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getStockByWarehouseNr = catchAsync(async (req, res, next) => {
    const { nr } = req.params;
    if (!nr) {
        next(new AppError('Nr is required', 400));
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
            ) + ' AND GNTOTST.INVENNO = :nr ',
            {
                type: QueryTypes.SELECT,
                replacements: { nr },
            }
        )
        .then((stocks) => {
            res.json(stocks);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

module.exports = { getWarehouses, getWarehouseByNr, getStockByWarehouseNr };
