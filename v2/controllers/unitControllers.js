'use strict';
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
        if (inc === 'barcode') {
            includes.push({
                model: req.models.barcodes,
            });
        } else if (inc === 'item') {
            includes.push({
                model: req.models.items,
            });
        } else if (inc === 'unit') {
            includes.push({
                model: req.models.units,
            });
        } else if (inc === 'unitSet') {
            includes.push({
                model: req.models.unitSets,
            });
        } else if (inc === 'units') {
            includes.push({
                model: req.models.units,
            });
        }
    });
    return includes;
};

exportObj.getUnits = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.units
        .findAll({ limit, offset, include: checkIncludes(req) })
        .then((units) => {
            res.json(units);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getItemUnits = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.itemUnits
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((itemUnits) => {
            res.json(itemUnits);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getItemUnitById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    req.models.itemUnits
        .findOne({ include: checkIncludes(req), where: { id } })
        .then((itemUnit) => {
            if (!itemUnit) {
                res.status(404).json({
                    status: 'fail',
                    message: 'ItemUnit not found',
                });
                return;
            }
            res.json(itemUnit);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getUnitSets = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.unitSets
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((unitSets) => {
            res.json(unitSets);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
