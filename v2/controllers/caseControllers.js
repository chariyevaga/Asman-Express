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
        if (inc === 'division') {
            includes.push({
                model: req.models.divisions,
            });
        } else if (inc === 'currency') {
            includes.push({
                model: req.models.currencies,
            });
        }
    });
    return includes;
};

exportObj.getCases = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.cases
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((cases) => {
            res.json(cases);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getCaseById = catchAsync(async (req, res, next) => {
    req.models.cases
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((case_) => {
            if (!case_) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Case not found',
                });
                return;
            }
            res.json(case_);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
