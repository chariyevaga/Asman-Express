'use strict';

const { models } = require('../sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const getItems = catchAsync(async (req, res, next) => {
    // limit & offset
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;

    let { include } = req.query;
    include = Array.isArray(include) ? include : include ? [include] : [];

    let includes = [];
    let excludes = [];
    include.forEach((inc) => {
        if (inc === 'brands') {
            includes.push({ model: models.brands });
        } else if (inc === 'units') {
            includes.push({ model: models.units });
        } else if (inc === 'stocks') {
            includes.push({
                model: models.stocks,
                attributes: ['onhand', 'reserved'],
                include: { model: models.warehouses },
                subQuery: true,
            });
        }
    });
    models.items
        .findAll({
            limit,
            offset,
            include: includes,
            subQuery: false,
        })
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            next(new AppError(err, 500));
        });
});

module.exports = {
    getItems,
};
