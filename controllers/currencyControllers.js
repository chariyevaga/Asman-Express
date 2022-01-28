'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const currenciesQuery = require('../queries/currenciesQuery');
const exchangesQuery = require('../queries/exchangesQuery');

const getCurrencies = catchAsync(async (req, res, next) => {
    sequelize
        .query(currenciesQuery(req.firmNr), {
            type: QueryTypes.SELECT,
        })
        .then((currencies) => {
            res.json(currencies);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getCurrencyById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        next(new AppError('Nr is required', 400));
    }

    sequelize
        .query(
            currenciesQuery(req.firmNr) + ' AND CURRENCYLIST.CURTYPE = :id ',
            {
                type: QueryTypes.SELECT,
                plain: true,
                replacements: { id },
            }
        )
        .then((warehouse) => {
            res.json(warehouse);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getExchanges = catchAsync(async (req, res, next) => {
    sequelize
        .query(exchangesQuery(req.firmDBname, req.firmTigerFormat), {
            type: QueryTypes.SELECT,
        })
        .then((currencies) => {
            res.json(currencies);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getExchangesUpToDay = catchAsync(async (req, res, next) => {
    await sequelize
        .query(
            `SELECT 
            EX1.LREF id, 
            EX1.crtype currencyId, 
            ROUND(EX1.rates1, 10) rates1,
            ROUND(EX1.rates2, 10) rates2,
            ROUND(EX1.rates3, 10) rates3,
            ROUND(EX1.rates4, 10) rates4 ,
            FORMAT(${process.env.DB_NAME}.dbo.AGO_INTTODATE(DATE_),'yyyy-MM-dd') date
            FROM ${req.firmDBname}..LG_EXCHANGE_${req.firmTigerFormat} EX1
            WHERE
            FORMAT(${process.env.DB_NAME}.dbo.AGO_INTTODATE(DATE_),'yyyy-MM-dd') <= GETDATE() 
            AND (EX1.rates1 <> 0 or EX1.rates2 <> 0 or EX1.rates3 <> 0 or EX1.rates4 <> 0) AND 
            DATE_ = 
            (SELECT max(DATE_) FROM ${req.firmDBname}..LG_EXCHANGE_${req.firmTigerFormat} EX2
                WHERE EX2.crtype = EX1.crtype
                AND FORMAT(${process.env.DB_NAME}.dbo.AGO_INTTODATE(DATE_),'yyyy-MM-dd') <= GETDATE() AND (EX2.rates1 <> 0 or EX2.rates2 <> 0 or EX2.rates3 <> 0 or EX2.rates4 <> 0))`,

            {
                type: QueryTypes.SELECT,
            }
        )
        .then((currencies) => {
            res.json(currencies);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

module.exports = {
    getCurrencies,
    getCurrencyById,
    getExchanges,
    getExchangesUpToDay,
};
