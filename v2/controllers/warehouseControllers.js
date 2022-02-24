'use strict';
const { models } = require('../sequelize');
const { Sequelize } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const exportObj = {};
/**
 * Checking query has include return array for include models
 *
 * @param {request} req
 * @returns {array} Array includes sequelize models
 */
const checkIncludes = (req) => {
    let includeArray = Array.isArray(req.query?.include)
        ? req.query.include
        : req.query?.include
        ? [req.query.include]
        : [];

    let includes = [];
    includeArray.forEach((inc) => {
        if (['division', 'divisions'].includes(inc)) {
            includes.push({
                model: models.divisions,
            });
        }
    });
    return includes;
};

exportObj.getWarehouses = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    models.warehouses
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((warehouses) => {
            res.json(warehouses);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getWarehouseById = catchAsync(async (req, res, next) => {
    models.warehouses
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((warehouses) => {
            res.json(warehouses);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});
module.exports = exportObj;
