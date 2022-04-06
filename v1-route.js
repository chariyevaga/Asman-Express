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

/**
 *@swagger
 * tags:
 *     name: V1
 *     description: Tiger API V1
 * paths:
 *   /v1:
 *     get:
 *       tags: [V1]
 *       deprecated: true
 *       summary: All api/v1/endPoints deprecated. Use v2 end Points
 *      responses:
 *          200:
 *              description: All api/v1/endPoints deprecated. Use v2 end Points
 */
// API's
router.use('/items', itemsRoutes);
router.use('/units', unitRoutes);
router.use('/divisions', divisionRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/currencies', currencyRoutes);
router.use('/barcodes', barcodeRoutes);
router.use('/prices', pricesRoutes);

module.exports = router;
