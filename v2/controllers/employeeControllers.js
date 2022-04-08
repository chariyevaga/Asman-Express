'use strict';
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const exportObj = {};

exportObj.getEmployees = catchAsync(async (req, res, next) => {
    let { limit, offset } = req.query;
    limit = isNaN(limit) ? null : +limit;
    offset = isNaN(offset) ? null : +offset;
    req.models.employees
        .findAll({ limit, offset })
        .then((employees) => {
            res.json(employees);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

exportObj.getEmployeeById = catchAsync(async (req, res, next) => {
    req.models.employees
        .findOne({ where: { id: req.params.id } })
        .then((employee) => {
            if (!employee) {
                res.status(404).json({
                    status: 'fail',
                    message: 'Employee not found',
                });
                return;
            }
            res.json(employee);
        })
        .catch((error) => {
            next(new AppError(error, 500));
        });
});

module.exports = exportObj;
