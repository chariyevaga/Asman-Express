'use strict';
const AppError = require('../utils/AppError');
const getDBname = require('../utils/getDBName');

module.exports = async (req, res, next) => {
    const { firmNr, donem } = req.query;
    if (!firmNr) {
        next(new AppError('FirmNr is required', 400));
    }
    req.firmDBname = await getDBname(firmNr).then((e) => e);
    req.firmTigerFormat = `00${firmNr}`.slice(-3);
    req.firmNr = firmNr;
    if (donem) {
        req.donemTigerFormat = `0${donem}`.slice(-2);
    }
    next();
};
