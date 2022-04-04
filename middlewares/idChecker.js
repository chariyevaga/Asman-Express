'use strict';
const AppError = require('../utils/appError');

/**
 * checking has id in params. If has next() function works.
 * if not next with error;
 *
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns next statment with error or just next;
 */
module.exports = async (req, res, next) => {
    if (!isNaN(req.params?.id)) {
        next();
        return;
    }
    next(new AppError('Id is required', 400));
};
