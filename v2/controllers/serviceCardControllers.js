'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const exportObj = {};

exportObj.getServiceCards = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    let where = null;
    if (req.query?.type) {
        if (req.query.type === 'receivedServices') {
            where = { type: 1 };
        } else if (req.query.type === 'providedServices') {
            where = { type: 2 };
        }
    }
    req.models.serviceCards
        .findAll({ limit, offset, where })
        .then((serviceCards) => {
            res.json(serviceCards);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getServiceCardById = catchAsync(async (req, res, next) => {
    req.models.serviceCards
        .findOne({ where: { id: req.params.id } })
        .then((seriveCard) => {
            if (!seriveCard) {
                res.status(404).json({
                    status: 'fail',
                    message: 'ServiceCard not found',
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
