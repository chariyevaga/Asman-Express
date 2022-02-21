'use strict';
const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const divisionsQuery = require('../queries/divisionsQuery');
const warehousesQuery = require('../queries/warehousesQuery');

const getDivisions = catchAsync(async (req, res, next) => {
    const { nr, id } = req.query;
    let whereQuery = '';
    if (nr) {
        whereQuery += ' AND CAPIDIV.NR = :nr ';
    }

    if (id) {
        whereQuery += ' AND CAPIDIV.LOGICALREF = :id';
    }

    sequelize
        .query(divisionsQuery(req.firmNr) + whereQuery, {
            type: QueryTypes.SELECT,
            replacements: { id, nr },
            plain: id || nr,
        })
        .then((divisions) => {
            res.json(divisions);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getDivisionByNr = catchAsync(async (req, res, next) => {
    const { nr } = req.params;
    if (!nr) {
        next(new AppError('Nr is required', 400));
    }

    sequelize
        .query(divisionsQuery(req.firmNr) + ' AND CAPIDIV.NR = :nr ', {
            type: QueryTypes.SELECT,
            plain: true,
            replacements: { nr },
        })
        .then((division) => {
            res.json(division);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

const getWarehousesByDivisionNr = catchAsync(async (req, res, next) => {
    const { nr } = req.params;
    if (!nr) {
        next(new AppError('Nr is required', 400));
    }

    sequelize
        .query(warehousesQuery(req.firmNr) + ' AND CAPIWHOUSE.DIVISNR = :nr ', {
            type: QueryTypes.SELECT,
            replacements: { nr },
        })
        .then((warehouses) => {
            res.json(warehouses);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});
module.exports = { getDivisions, getDivisionByNr, getWarehousesByDivisionNr };
