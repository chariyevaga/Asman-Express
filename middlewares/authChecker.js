'use strict';
const AppError = require('../utils/appError');
const authFirm = require('../config/authFirm');
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
    if (
        !req?.headers?.authorization ||
        req?.headers?.authorization?.indexOf('Basic ') === -1
    ) {
        next(new AppError('Missing Authorization Header', 401));
        return;
    }

    const base64Credentials = req.headers?.authorization?.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'ascii'
    );

    const [username, password] = credentials.split(':');
    const access = authFirm.filter(
        (auth) => auth.userName === username && auth.password === password
    );
    if (access.length > 0) {
        req.firmNr = access[0]?.firmNr;
        req.firmDBname = access[0]?.firmDBname;
        req.donem = access[0]?.donem;
        req.donemTigerFormat = access[0]?.donemTigerFormat;
        req.firmTigerFormat = access[0]?.firmTigerFormat;
        req.localCurrency = access[0]?.localCurrency;
        const { models } = require('../v2/sequelize')(req.firmDBname);
        req.models = models;
        next();
    } else {
        next(new AppError('Wrong authorization', 401));
    }
});
