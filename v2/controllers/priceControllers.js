'use strict';
const { Sequelize } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const exportObj = {};
function tryToJSONParse(data) {
    try {
        return JSON.parse(data);
    } catch (err) {
        return data;
    }
}
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
        if (['currencies', 'currency'].includes(inc)) {
            includes.push({ model: req.models.currencies });
        } else if (inc === 'units' || inc === 'unit') {
            includes.push({
                model: req.models.units,
            });
        }
    });

    return includes;
};

exportObj.getPrices = catchAsync(async (req, res, next) => {
    const { type } = req.query;

    const where = req?.where;

    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    let model = req.models.prices;
    if (type === 'sale') {
        model = req.models.prices.scope('allSalePrices');
    } else if (type === 'purchase') {
        model = req.models.prices.scope('purchasePrices');
    } else if (type === 'lastPurchase') {
        const priceIds = await req.models.prices
            .scope('purchasePrices')
            .findAll({
                where: { ...where },
                attributes: [
                    [Sequelize.fn('max', Sequelize.col('id')), 'id'],
                    'itemId',
                ],
                group: ['itemId'],
            })
            .then((priceIds) => {
                console.log(priceIds);
                return priceIds?.map((p) => p.id);
            })
            .catch((error) => {
                next(new AppError(error, 500));
                return;
            });

        // get prices
        await req.models.prices[where?.itemId ? 'findOne' : 'findAll']({
            where: { id: priceIds },
            include: checkIncludes(req),
            limit,
            offset,
        })
            .then((lastPurchasePrices) => {
                res.json(
                    lastPurchasePrices?.length
                        ? lastPurchasePrices.map((price) => {
                              price.divisions = tryToJSONParse(price.divisions);
                              return price;
                          })
                        : lastPurchasePrices
                );
            })
            .catch((error) => {
                next(new AppError(error, 500));
            });
        return;
    } else if (type === 'actualtSale') {
        model = req.models.prices.scope('currentSalePrices');
    }
    model
        .findAll({
            where: { ...where },
            limit,
            offset,
            include: checkIncludes(req),
        })
        .then((prices) => {
            res.json(
                prices.map((price) => {
                    price.divisions = tryToJSONParse(price.divisions);
                    return price;
                })
            );
        })
        .catch((error) => {
            next(error, 500);
        });
});

exportObj.getPriceById = catchAsync(async (req, res, next) => {
    req.where = { id: req.params.id };
    exportObj.getPrices(req, res, next);
});

exportObj.getPricesByItemId = catchAsync(async (req, res, next) => {
    req.where = { itemId: req.params.id };
    exportObj.getPrices(req, res, next);
});

exportObj.getPricesByBarcode = catchAsync(async (req, res, next) => {
    const { barcode } = req.params;
    if (!barcode) {
        next(new AppError('Barcode is required', 400));
        return;
    }
    const itemId = (
        await req.models.barcodes.findOne({
            where: {
                barcode: barcode,
            },
        })
    )?.itemId;

    if (itemId) {
        req.where = { itemId };
        exportObj.getPrices(req, res, next);
    } else {
        res.json([]);
    }
});

module.exports = exportObj;
