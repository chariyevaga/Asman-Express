'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const currenciesQuery = require('../queries/currenciesQuery');

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

module.exports = { getCurrencies, getCurrencyById };
