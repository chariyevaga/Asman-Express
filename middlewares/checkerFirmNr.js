'use strict';
const AppError = require('../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const getDBname = require('../utils/getDBName');

module.exports = catchAsync(async (req, res, next) => {
    const { firmNr, donem } = req.query;
    if (!firmNr) {
        next(new AppError('FirmNr is required', 400));
        return;
    }
    req.firmDBname = await getDBname(firmNr).then((e) => e);
    req.firmTigerFormat = `00${firmNr}`.slice(-3);
    req.firmNr = firmNr;
    if (donem) {
        req.donemTigerFormat = `0${donem}`.slice(-2);
    }
    next();
});
