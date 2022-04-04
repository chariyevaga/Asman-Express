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
        if (inc === 'units') {
            includes.push({
                model: req.models.itemUnits,
                include: { model: req.models.units },
            });
        } else if (['item', 'items'].includes(inc)) {
            includes.push({
                model: req.models.items,
            });
        }
    });
    return includes;
};

exportObj.getBarcodes = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    req.models.barcodes
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

    req.models.barcodes
        .findOne({
            where,
            include: checkIncludes(req),
        })
        .then((barcode) => {
            if (!barcode) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Barcode not found',
                });
                return;
            }
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
        itemId = (await req.models.barcodes.findOne({ where: { id: data } }))
            ?.itemId;
    } else if (type === 'barcode') {
        itemId = (
            await req.models.barcodes.findOne({ where: { barcode: data } })
        )?.itemId;
    }
    if (!itemId) {
        res.status(404).json({
            status: 'fail',
            message: 'Item not found',
        });
        return;
    }
    req.models.items
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
        itemUnitId = (
            await req.models.barcodes.findOne({ where: { id: data } })
        )?.itemUnitId;
    } else if (type === 'barcode') {
        itemUnitId = (
            await req.models.barcodes.findOne({ where: { barcode: data } })
        )?.itemUnitId;
    }
    if (!itemUnitId) {
        res.status(404).json({
            status: 'fail',
            message: 'ItemUnite not found',
        });
        return;
    }
    req.models.itemUnits
        .findOne({
            where: { id: itemUnitId },
            include: { model: req.models.units },
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
        itemId = (await req.models.barcodes.findOne({ where: { id: data } }))
            ?.itemId;
    } else if (type === 'barcode') {
        itemId = (
            await req.models.barcodes.findOne({ where: { barcode: data } })
        )?.itemId;
    }
    if (!itemId) {
        res.status(404).json({
            status: 'fail',
            message: 'Item not found',
        });
        return;
    }
    req.models.stocks
        .findAll({
            where: { itemId },
            include: { model: req.models.warehouses },
        })
        .then((stocks) => {
            res.json(stocks);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});
module.exports = exportObj;
