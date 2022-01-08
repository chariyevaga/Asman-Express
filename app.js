const express = require('express');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');

const errorHandler = require('./utils/errorHandler');

const app = express();

// middlewares
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
    max: process.env.NODE_ENV !== 'production' ? 1000 : 100,
    windowMs: 10 * 5 * 1000,
    message: 'Too many requests from this IP, please try in an 5 min!',
});

app.use(errorHandler);
app.use(limiter);

module.exports = app;
