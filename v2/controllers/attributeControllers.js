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
        if (inc === 'attributeValues' || inc === 'attributeValue') {
            includes.push({
                model: req.models.attributeValues,
            });
        } else if (inc === 'attributeKey') {
            includes.push({
                model: req.models.attributeKeys,
            });
        } else if (inc === 'item') {
            includes.push({
                model: req.models.items,
            });
        }
    });
    return includes;
};

exportObj.getAttributeKeys = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    req.models.attributeKeys
        .findAll({
            limit,
            offset,
            include: checkIncludes(req),
        })
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

exportObj.getAttributeValues = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    req.models.attributeValues
        .findAll({
            limit,
            offset,
            include: checkIncludes(req),
        })
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

exportObj.getAttributes = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    req.models.attributes
        .findAll({
            limit,
            offset,
            include: checkIncludes(req),
        })
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});
module.exports = exportObj;
