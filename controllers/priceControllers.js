'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const pricesNowQuery = require('../queries/pricesNowQuery');
const pricesAllQuery = require('../queries/pricesAllQuery');

const getAllPrices = catchAsync(async (req, res, next) => {
    const { itemId, id, divisionNr } = req.query;
    let whereQuery = '';
    if (id) {
        whereQuery += ' AND PRICE.LOGICALREF = :id';
    }
    if (itemId) {
        whereQuery += ' AND PRICE.CARDREF = :itemId';
    }

    sequelize
        .query(
            pricesAllQuery(
                req.firmDBname,
                req.firmTigerFormat,
                req.localCurrency
            ) + whereQuery,
            {
                type: QueryTypes.SELECT,
                replacements: { id, divisionNr, itemId },
                plain: id,
            }
        )
        .then((prices) => {
            res.json(prices);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getPriceNow = catchAsync(async (req, res, next) => {
    const { itemId, id, divisionNr } = req.query;
    let whereQuery = '';
    if (id) {
        whereQuery += ' AND id = :id';
    }
    if (itemId) {
        whereQuery += ' AND itemId = :itemId';
    }

    if (divisionNr) {
        whereQuery += ' AND divisionNr = :divisionNr';
    }

    sequelize
        .query(
            pricesNowQuery(
                req.firmNr,
                req.firmDBname,
                req.firmTigerFormat,
                req.localCurrency
            ) + whereQuery,
            {
                type: QueryTypes.SELECT,
                replacements: { id, divisionNr, itemId },
                plain: id || (itemId && divisionNr),
            }
        )
        .then((prices) => {
            res.json(prices);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});
const getPriceNowByItemId = catchAsync(async (req, res, next) => {
    // const { nr } = req.params;
    // if (!nr) {
    //     next(new AppError('Nr is required', 400));
    // }
    // sequelize
    //     .query(warehousesQuery(req.firmNr) + ' AND CAPIDIV.NR = :nr ', {
    //         type: QueryTypes.SELECT,
    //         plain: true,
    //         replacements: { nr },
    //     })
    //     .then((warehouse) => {
    //         res.json(warehouse);
    //     })
    //     .catch((err) => {
    //         next(new AppError(err, 500));
    //     });
});

const getPriceNowByDivisionNr = catchAsync(async (req, res, next) => {
    // const { nr } = req.params;
    // if (!nr) {
    //     next(new AppError('Nr is required', 400));
    // }
    // if (!req.donemTigerFormat) {
    //     next(new AppError('Donem is required', 400));
    // }
    // sequelize
    //     .query(
    //         stockQuery(
    //             req.firmDBname,
    //             req.firmTigerFormat,
    //             req.donemTigerFormat
    //         ) + ' AND GNTOTST.INVENNO = :nr ',
    //         {
    //             type: QueryTypes.SELECT,
    //             replacements: { nr },
    //         }
    //     )
    //     .then((stocks) => {
    //         res.json(stocks);
    //     })
    //     .catch((err) => {
    //         next(new AppError(err, 500));
    //     });
});

module.exports = {
    getAllPrices,
    getPriceNow,
    getPriceNowByItemId,
    getPriceNowByDivisionNr,
};
