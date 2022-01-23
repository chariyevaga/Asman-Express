'use strict';
const express = require('express');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const helmet = require('helmet');
const sequelize = require('./config/db');

const app = express();

const limiter = rateLimit({
    max: process.env.NODE_ENV !== 'production' ? 1000 : 100,
    windowMs: 10 * 5 * 1000,
    message: 'Too many requests from this IP, please try in an 5 min!',
});

// middleware routes
// const firmInformationChecker = require('./middlewares/checkerFirmNr'); // old verion
const authChecker = require('./middlewares/authChecker');

// middelwares
app.use(helmet());
app.use(xss());
app.use(limiter);
// app.use(authChecker);
app.use(authChecker);

// API routes
const unitRoutes = require('./routes/unitRoutes');
const itemsRoutes = require('./routes/itemRoutes');
const divisionRoutes = require('./routes/divisionRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const barcodeRoutes = require('./routes/barcodeRoutes');
const pricesRoutes = require('./routes/pricesRoutes');

const errorHandler = require('./utils/errorHandler');

// API's
app.use('/api/v1/units', unitRoutes);
app.use('/api/v1/items', itemsRoutes);
app.use('/api/v1/divisions', divisionRoutes);
app.use('/api/v1/warehouses', warehouseRoutes);
app.use('/api/v1/currencies', currencyRoutes);
app.use('/api/v1/barcodes', barcodeRoutes);
app.use('/api/v1/prices', pricesRoutes);

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
