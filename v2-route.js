'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

// API routes
const itemsRoutes = require('./v2/routes/itemRoutes');
// const unitRoutes = require('./v2/routes/unitRoutes');
// const divisionRoutes = require('./v2/routes/divisionRoutes');
// const warehouseRoutes = require('./v2/routes/warehouseRoutes');
// const currencyRoutes = require('./v2/routes/currencyRoutes');
// const barcodeRoutes = require('./v2/routes/barcodeRoutes');
// const pricesRoutes = require('./v2/routes/pricesRoutes');
// const errorHandler = require('./utils/errorHandler');

// API's
router.use('/items', itemsRoutes);
// router.use('/units', unitRoutes);
// router.use('/divisions', divisionRoutes);
// router.use('/warehouses', warehouseRoutes);
// router.use('/currencies', currencyRoutes);
// router.use('/barcodes', barcodeRoutes);
// router.use('/prices', pricesRoutes);

module.exports = router;
