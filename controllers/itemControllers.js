'use strict';
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const itemsQuery = require('../queries/itemsQuery');
const itemUnitsQuery = require('../queries/itemUnitsQuery');

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

const getItemUnitsById = catchAsync(async (req, res, next) => {
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
        .then((units) => {
            res.json(units);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

module.exports = { getItems, getItemById, getItemUnitsById };
