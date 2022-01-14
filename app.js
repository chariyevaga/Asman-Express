'use strict';
const express = require('express');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');
const sequelize = require('./config/db');

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

app.use(limiter);
app.use(require('./middlewares/checkerFirmNr'));

app.use('/api/v1/units', require('./routes/unitRoutes'));
app.use('/api/v1/items', require('./routes/itemRoutes'));
app.use('/api/v1/divisions', require('./routes/divisionRoutes'));
app.use('/api/v1/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/v1/currencies', require('./routes/currencyRoutes'));
app.use('/api/v1/barcodes', require('./routes/barcodeRoutes'));

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
