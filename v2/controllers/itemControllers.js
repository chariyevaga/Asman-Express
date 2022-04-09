'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { Op, Sequelize } = require('sequelize');

/**
 * Checking query has include return array for include models
 *
 * @param {request} req
 * @returns {array} Array includes sequelize models
 */
const checkIncludes = (req) => {
    const { models } = require('../sequelize')(req.firmDBname);
    let includeArray = Array.isArray(req.query?.include)
        ? req.query.include
        : req.query?.include
        ? [req.query.include]
        : [];

    let includes = [];
    includeArray.forEach((inc) => {
        if (['brands', 'brand'].includes(inc)) {
            includes.push({ model: req.models.brands });
        } else if (inc === 'units' || inc === 'unit') {
            includes.push({
                model: req.models.units,
            });
        } else if (inc === 'stocks') {
            includes.push({
                model: req.models.stocks,
                attributes: ['onhand', 'reserved'],
                include: { model: req.models.warehouses },
            });
        } else if (inc === 'barcodes') {
            includes.push({
                model: req.models.barcodes,
            });
        } else if (['warehouse', 'warehouses'].includes(inc)) {
            includes.push({
                model: req.models.warehouses,
            });
        } else if ('attributes' === inc) {
            includes.push({
                model: req.models.attributes,
                include: [
                    { model: req.models.attributeKeys },
                    { model: req.models.attributeValues },
                ],
            });
        } else if (inc === 'alternatives') {
            includes.push({ model: req.models.items, as: 'alternatives' });
        }
    });

    return includes;
};

/**
 * response items or empty array [];
 */
const getItems = catchAsync(async (req, res, next) => {
    const { models } = require('../sequelize')(req.firmDBname);
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
    req.models.items
        .findAll({
            limit,
            offset,
            order,
            include: checkIncludes(req),
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
    const { models } = require('../sequelize')(req.firmDBname);
    req.models.items
        .findOne({
            where: { id },
            include: checkIncludes(req),
        })
        .then((item) => {
            if (!item) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Item not found',
                });
                return;
            }
            res.json(item);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

/**
 * response barcodes or empty [];
 */
const getBarcodesByItemId = catchAsync(async (req, res, next) => {
    const { models } = require('../sequelize')(req.firmDBname);
    req.models.barcodes
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
    const { models } = require('../sequelize')(req.firmDBname);
    req.models.stocks
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
    let include = [{ model: req.models.units }];
    if (
        req.query?.include === 'barcodes' ||
        req.query?.include === 'barcode' ||
        req.query?.include?.includes('barcodes')
    ) {
        include.push({
            model: req.models.barcodes,
            where: { itemId: req.params?.id },
        });
    }

    req.models.itemUnits
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

const { getPrices } = require('./priceControllers');
// prices
const getPricesByItemId = catchAsync(async (req, res, next) => {
    req.where = { itemId: req.params?.id };
    getPrices(req, res, next);
});

module.exports = {
    getItems,
    getItemById,
    getBarcodesByItemId,
    getStocksByItemId,
    getUnitsByItemId,
    getPricesByItemId,
};
