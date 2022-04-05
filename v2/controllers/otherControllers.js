'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Sequelize = require('sequelize');

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
        if (inc === 'item') {
            includes.push({
                model: req.models.items,
            });
        } else if (inc === 'warehouse') {
            includes.push({
                model: req.models.warehouses,
            });
        }
    });
    return includes;
};

exportObj.getStocks = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.stocks
        .findAll({
            include: checkIncludes(req),
            limit,
            offset,
            subQuery: true,
            order: ['itemId'],
        })
        .then((stocks) => {
            res.json(stocks);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getStockByData = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    if (!req.params?.data) {
        next(new AppError('Data is required', 400));
        return;
    }
    if (!['itemId', 'warehouseNr'].includes(req.query?.type)) {
        next(new AppError('Type most be itemId or warehousesNr', 400));
        return;
    }

    const where = { [req.query?.type]: req.params?.data };

    req.models.stocks
        .findAll({
            include: checkIncludes(req),
            limit,
            offset,
            where,
            subQuery: true,
            order: ['itemId'],
        })
        .then((stocks) => {
            res.json(stocks);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
