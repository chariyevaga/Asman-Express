'use strict';
const express = require('express');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

const limiter = rateLimit({
    max: process.env.NODE_ENV !== 'production' ? 1000 : 100,
    windowMs: 10 * 5 * 1000,
    message: 'Too many requests from this IP, please try in an 5 min!',
});

// middleware routes
const authChecker = require('./middlewares/authChecker');
const errorHandler = require('./utils/errorHandler');
const v1Route = require('./v1-route');
const v2Route = require('./v2-route');

// middelwares
app.use(cookieParser());
app.use(helmet());
app.use(xss());

app.use(limiter);
app.use(authChecker);
app.use('/api/v1', v1Route);
app.use('/api/v2', v2Route);

app.use(errorHandler);

// DATABASE CONNECTION TESTING
try {
    sequelize.authenticate(() => {
        console.log('Database is OK');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = app;
