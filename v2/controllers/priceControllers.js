'use strict';

const { models } = require('../sequelize');
const { Sequelize } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const exportObj = {};

exportObj.getPrices = catchAsync(async (req, res, next) => {
    const { type } = req.query;
    const include = [{ model: models.currencies }];
    const where = req?.where;

    let model = models.prices;
    if (type === 'sale') {
        model = models.prices.scope('allSalePrices');
    } else if (type === 'purchase') {
        model = models.prices.scope('purchasePrices');
    } else if (type === 'lastPurchase') {
        const priceIds = await models.prices
            .scope('purchasePrices')
            .findAll({
                where: { ...where },
                attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'id']],
                group: ['itemId'],
            })
            .then((priceIds) => {
                return priceIds.map((p) => p.id);
            })
            .catch((error) => {
                next(new AppError(error, 500));
                return;
            });

        // get prices
        await models.prices[where?.itemId ? 'findOne' : 'findAll']({
            where: { id: priceIds },
            include,
        })
            .then((lastPurchasePrices) => {
                res.json(lastPurchasePrices);
            })
            .catch((error) => {
                next(new AppError(error, 500));
            });
        return;
    } else if (type === 'correntSale') {
        await models.prices
            .scope('currentSalePrices')
            [where?.itemId ? 'findOne' : 'findAll']({
                where: { ...where },
                include,
            })
            .then((prices) => {
                const itemIds = [];
                // get last priority lest and last added
                res.json(
                    where?.itemId
                        ? prices
                        : prices.filter((price) => {
                              if (itemIds.includes(price.itemId)) {
                                  return false;
                              } else {
                                  itemIds.push(price.itemId);
                                  return true;
                              }
                          })
                );
            })
            .catch((error) => {
                next(error, 500);
            });
        return;
    }
    model
        .findAll({
            where: { ...where },
            include,
        })
        .then((prices) => {
            res.json(prices);
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
        await models.barcodes.findOne({
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
