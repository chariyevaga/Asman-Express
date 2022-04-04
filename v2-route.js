'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

// API routes
const itemsRoutes = require('./v2/routes/itemRoutes');
const pricesRoutes = require('./v2/routes/priceRoutes');
const barcodeRoutes = require('./v2/routes/barcodeRoutes');
const unitRoutes = require('./v2/routes/unitRoutes');
const divisionRoutes = require('./v2/routes/divisionRoutes');
const warehouseRoutes = require('./v2/routes/warehouseRoutes');
const brandRoutes = require('./v2/routes/brandRoutes');
const itemUnitRoutes = require('./v2/routes/itemUnitRoutes');
// const currencyRoutes = require('./v2/routes/currencyRoutes');

// API's
router.use('/items', itemsRoutes);
router.use('/prices', pricesRoutes);
router.use('/barcodes', barcodeRoutes);
router.use('/units', unitRoutes);
router.use('/divisions', divisionRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/brands', brandRoutes);
router.use('/itemUnits', itemUnitRoutes);

// router.use('/currencies', currencyRoutes);

module.exports = router;
