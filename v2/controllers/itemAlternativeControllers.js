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
        if (inc === 'item') {
            includes.push({ model: req.models.items });
        } else if (inc === 'alternative') {
            includes.push({ model: req.models.items, as: 'alternative' });
        }
    });
    return includes;
};

exportObj.getAlternatives = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    console.log(req.query);
    req.models.itemAlternatives
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((alternatives) => {
            res.json(alternatives);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getAlternativeById = catchAsync(async (req, res, next) => {
    req.models.itemAlternatives
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((alternative) => {
            if (!alternative) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Alternative not found',
                });
                return;
            }
            res.json(alternative);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
