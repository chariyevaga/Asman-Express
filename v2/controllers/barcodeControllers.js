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
        if (inc === 'units') {
            includes.push({
                model: models.itemUnits,
                include: { model: models.units },
            });
        } else if (['item', 'items'].includes(inc)) {
            includes.push({
                model: models.items,
            });
        }
    });
    return includes;
};

exportObj.getBarcodes = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    models.barcodes
        .findAll({
            limit,
            offset,
            include: checkIncludes(req),
            subQuery: false,
        })
        .then((barcodes) => {
            res.json(barcodes);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

exportObj.getBarcodeByData = catchAsync(async (req, res, next) => {
    // id or barcode
    const { type } = req.query;
    const { data } = req.params;

    let where = null;
    if (type === 'id') {
        where = {
            id: data,
        };
    } else if (type === 'barcode') {
        where = {
            barcode: data,
        };
    }

    models.barcodes
        .findOne({
            where,
            include: checkIncludes(req),
            subQuery: false,
        })
        .then((barcode) => {
            res.json(barcode);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

exportObj.getItemByBarcodeData = catchAsync(async (req, res, next) => {
    // id or barcode
    const { type } = req.query;
    const { data } = req.params;

    let itemId = null;
    if (type === 'id') {
        itemId = (await models.barcodes.findOne({ where: { id: data } }))
            ?.itemId;
    } else if (type === 'barcode') {
        itemId = (await models.barcodes.findOne({ where: { barcode: data } }))
            ?.itemId;
    }

    models.items
        .findOne({
            where: { id: itemId },
        })
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

exportObj.getUnitByBarcodeData = catchAsync(async (req, res, next) => {
    // id or barcode
    const { type } = req.query;
    const { data } = req.params;

    let itemUnitId = null;
    if (type === 'id') {
        itemUnitId = (await models.barcodes.findOne({ where: { id: data } }))
            ?.itemUnitId;
    } else if (type === 'barcode') {
        itemUnitId = (
            await models.barcodes.findOne({ where: { barcode: data } })
        )?.itemUnitId;
    }

    models.itemUnits
        .findOne({
            where: { id: itemUnitId },
            include: { model: models.units },
        })
        .then((itemUnit) => {
            res.json(itemUnit);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

exportObj.getStocksByBarcodeData = catchAsync(async (req, res, next) => {
    // id or barcode
    const { type } = req.query;
    const { data } = req.params;

    let itemId = null;
    if (type === 'id') {
        itemId = (await models.barcodes.findOne({ where: { id: data } }))
            ?.itemId;
    } else if (type === 'barcode') {
        itemId = (await models.barcodes.findOne({ where: { barcode: data } }))
            ?.itemId;
    }

    models.stocks
        .findAll({
            where: { itemId },
            include: { model: models.warehouses },
        })
        .then((stocks) => {
            res.json(stocks);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});
module.exports = exportObj;
