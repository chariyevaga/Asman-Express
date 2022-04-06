'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const exportObj = {};

exportObj.getClients = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.clients
        .findAll({ limit, offset })
        .then((clients) => {
            res.json(clients);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getClientById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    req.models.clients
        .findOne({ where: { id } })
        .then((client) => {
            if (!client) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Client not found',
                });
                return;
            }
            res.json(client);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});
module.exports = exportObj;
