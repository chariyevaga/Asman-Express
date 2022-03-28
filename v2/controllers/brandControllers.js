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
        if (inc === 'items') {
            includes.push({
                model: req.models.items,
            });
        }
    });
    return includes;
};

exportObj.getBrands = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.brands
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((brands) => {
            res.json(brands);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBrandById = catchAsync(async (req, res, next) => {
    req.models.brands
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((brands) => {
            res.json(brands);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
