'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});
// API routes
const unitRoutes = require('./v1/routes/unitRoutes');
const itemsRoutes = require('./v1/routes/itemRoutes');
const divisionRoutes = require('./v1/routes/divisionRoutes');
const warehouseRoutes = require('./v1/routes/warehouseRoutes');
const currencyRoutes = require('./v1/routes/currencyRoutes');
const barcodeRoutes = require('./v1/routes/barcodeRoutes');
const pricesRoutes = require('./v1/routes/pricesRoutes');
const errorHandler = require('./utils/errorHandler');

// API's
router.use('/items', itemsRoutes);
router.use('/units', unitRoutes);
router.use('/divisions', divisionRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/currencies', currencyRoutes);
router.use('/barcodes', barcodeRoutes);
router.use('/prices', pricesRoutes);

module.exports = router;
