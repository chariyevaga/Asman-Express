'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const exportObj = {};

exportObj.getDiscountCards = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    let where = null;
    if (req.query?.type) {
        if (req.query.type === 'buyDiscount') {
            where = { type: 1 };
        } else if (req.query.type === 'salesDiscount') {
            where = { type: 2 };
        } else if (req.query.type === 'purchaseCost') {
            where = { type: 3 };
        } else if (req.query.type === 'salesCost') {
            where = { type: 4 };
        }
    }
    req.models.discountCards
        .findAll({ limit, offset, where })
        .then((discountCards) => {
            res.json(discountCards);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getDiscountCardById = catchAsync(async (req, res, next) => {
    req.models.discountCards
        .findOne({ where: { id: req.params.id } })
        .then((seriveCard) => {
            if (!seriveCard) {
                res.status(404).json({
                    status: 'fail',
                    message: 'DiscountCard not found',
                });
                return;
            }
            res.json(seriveCard);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});
module.exports = exportObj;
