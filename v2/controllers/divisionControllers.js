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
        if (inc === 'warehouses') {
            includes.push({
                model: models.warehouses,
            });
        }
    });
    return includes;
};

exportObj.getDivisions = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    models.divisions
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((divisions) => {
            res.json(divisions);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getDivisionById = catchAsync(async (req, res, next) => {
    models.divisions
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((divisions) => {
            res.json(divisions);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});
module.exports = exportObj;
