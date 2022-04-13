'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { Op, Sequelize } = require('sequelize');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const request = require('request');
const getTigerToken = require('../../utils/getTigerToken');

const createNewItems = async (req, res, next, tryCount = 5) => {
    let newItem = {
        CODE: req.body?.code,
        NAME: req.body?.name,
        NAME2: req.body?.name2,
        NAME3: req.body?.name3,
        NAME4: req.body?.name4,
        AUXIL_CODE: req.body?.specode1,
        AUXIL_CODE2: req.body?.specode2,
        AUXIL_CODE3: req.body?.specode3,
        AUXIL_CODE4: req.body?.specode4,
        AUXIL_CODE5: req.body?.specode5,
        KEYWORD1: req.body?.keyword1,
        KEYWORD2: req.body?.keyword2,
        KEYWORD3: req.body?.keyword3,
        KEYWORD4: req.body?.keyword3,
        KEYWORD5: req.body?.keyword3,
        PRODUCER_CODE: req.body?.producerCode,
        ORIGIN: req.body?.origin,
        B2CCODE: req.body?.eCode,
        UNITSET_CODE: req.body?.unitSetCode,
        MAINUNIT: req.body?.mainUnitCode,
        GROUP_CODE: req.body?.category,
        MARKCODE: req.body?.brandCode,
        CARD_TYPE: req.body?.cardType,
        SALES_LIMIT_QUANTITY: req.body?.salesLimitQuantity,
        REYON_CODE: req.body?.reyonCode,
        RECORD_STATUS: +!req.body?.active,
        USEF_PURCHASING: 1,
        USEF_SALES: 1,
        USEF_MM: 1,
        EXT_ACC_FLAGS: 7,
        VAT: 0,
    };
    // res.json(newItem);
    await request(
        {
            method: 'POST',
            url: `${process.env.TIGER_REST_URL}/items`,
            headers: {
                Authorization: `Bearer ${global.TIGER_TOKEN[req.firmNr]}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(newItem),
        },
        async function (error, response, body) {
            if (error) {
                // change status back like uncreted
                res.status(500).json(JSON.parse(response.body));
            } else {
                if (response?.statusCode === 200) {
                    res.status(200).json(
                        await req.models.items.findOne({
                            where: {
                                id: JSON.parse(response.body)
                                    ?.INTERNAL_REFERENCE,
                            },
                        })
                    );
                    return;
                } else if (response?.statusMessage === 'Unauthorized') {
                    global.TIGER_TOKEN[req.firmNr] = await getTigerToken(
                        req.firmNr
                    );
                    if (tryCount <= 5) {
                        createNewItems(req, res, next, tryCount);
                    } else {
                        next(new AppError("Can't get tiger tokken", 500));
                        return;
                    }
                } else {
                    res.status(400).json(JSON.parse(response.body));
                }
            }
        }
    );
};

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
    createNewItems,
};
