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
        if (inc === 'bankAccounts') {
            includes.push({
                model: req.models.bankAccounts,
            });
        } else if (inc === 'bank') {
            includes.push({
                model: req.models.banks,
            });
        } else if (inc === 'currency') {
            includes.push({
                model: req.models.currencies,
            });
        }
    });
    return includes;
};

exportObj.getBanks = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.banks
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((banks) => {
            res.json(banks);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBankById = catchAsync(async (req, res, next) => {
    req.models.banks
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((bank) => {
            if (!bank) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Bank not found',
                });
                return;
            }
            res.json(bank);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBankAccounts = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.bankAccounts
        .findAll({ include: checkIncludes(req), limit, offset })
        .then((bankAccounts) => {
            res.json(bankAccounts);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getBankAccountById = catchAsync(async (req, res, next) => {
    req.models.bankAccounts
        .findOne({ where: { id: req.params.id }, include: checkIncludes(req) })
        .then((bankAccount) => {
            if (!bankAccount) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Bank not found',
                });
                return;
            }
            res.json(bankAccount);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
