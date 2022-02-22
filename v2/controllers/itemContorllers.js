'use strict';

const { models } = require('../sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

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
        if (['brands', 'brand'].includes(inc)) {
            includes.push({ model: models.brands });
        } else if (inc === 'units') {
            includes.push({
                model: models.units,
            });
        } else if (inc === 'stocks') {
            includes.push({
                model: models.stocks,
                attributes: ['onhand', 'reserved'],
                include: { model: models.warehouses },
            });
        } else if (inc === 'barcodes') {
            includes.push({
                model: models.barcodes,
            });
        } else if (['warehouse', 'warehouses'].includes(inc)) {
            includes.push({
                model: models.warehouses,
            });
        }
    });

    return includes;
};

/**
 * checking has id in params. If has next() function works.
 * if not next with error;
 *
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns next statment with error or just next;
 */
const checkHasId = (req, res, next) => {
    if (!isNaN(req.params?.id)) {
        next();
        return;
    }
    next(new AppError('Item id is required'));
};

/**
 * response items or empty array [];
 */
const getItems = catchAsync(async (req, res, next) => {
    // limit & offset
    let { limit, offset, orderName, orderType } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    let order = null;
    if (orderName) {
        order = [
            [
                orderName,
                ['asc', 'desc'].includes(orderType) ? orderType : 'asc',
            ],
        ];
    }
    models.items
        .findAll({
            limit,
            offset,
            order,
            include: checkIncludes(req),
            subQuery: false,
        })
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

/**
 * response item or null;
 */
const getItemById = catchAsync(async (req, res, next) => {
    // limit & offset
    const { id } = req.params;
    if (!id) {
        next(new AppError('Id is required', 400));
        return;
    }
    models.items
        .findOne({
            where: { id },
            include: checkIncludes(req),
            subQuery: false,
        })
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

/**
 * response barcodes or empty [];
 */
const getBarcodesByItemId = catchAsync(async (req, res, next) => {
    models.barcodes
        .findAll({
            where: {
                itemId: req.params?.id,
            },
            include: checkIncludes(req),
        })
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((error) => {
            next(error, 500);
        });
});

/**
 * response stocks or empty [];
 */
const getStocksByItemId = catchAsync(async (req, res, next) => {
    models.stocks
        .findAll({
            where: {
                itemId: req.params?.id,
            },
            include: checkIncludes(req),
        })
        .then((stocks) => {
            res.json(stocks);
        })
        .catch((error) => {
            next(error, 500);
        });
});

/**
 * response units or empty [];
 */
const getUnitsByItemId = catchAsync(async (req, res, next) => {
    let include = [{ model: models.units }];
    if (
        req.query?.include === 'barcodes' ||
        req.query?.include?.includes('barcodes')
    ) {
        include.push({
            model: models.barcodes,
            where: { itemId: req.params?.id },
        });
    }

    models.itemUnits
        .findAll({
            where: {
                itemId: req.params?.id,
            },
            include,
        })
        .then((units) => {
            res.json(units);
        })
        .catch((error) => {
            next(error, 500);
        });
});

const getPricesByItemId = catchAsync(async (req, res, next) => {});

module.exports = {
    checkHasId,
    getItems,
    getItemById,
    getBarcodesByItemId,
    getStocksByItemId,
    getUnitsByItemId,
    getPricesByItemId,
};
