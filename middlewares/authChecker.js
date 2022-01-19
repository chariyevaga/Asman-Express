'use strict';
const AppError = require('../utils/AppError');

module.exports = async (req, res, next) => {
    if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf('Basic ') === -1
    ) {
        next(new AppError('Missing Authorization Header', 401));
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'ascii'
    );

    const [username, password] = credentials.split(':');
    res.json({ username, password });
};
