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
        if (inc === 'barcodes') {
            includes.push({
                model: req.models.barcodes,
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
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((units) => {
            res.json(units);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});
module.exports = exportObj;
