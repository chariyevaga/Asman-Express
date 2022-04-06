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
const attributeKeyRoutes = require('./v2/routes/attributeKeyRoutes');
const attributeValueRoutes = require('./v2/routes/attributeValueRoutes');
const attributeRoutes = require('./v2/routes/attributeRoutes');
const stockRoutes = require('./v2/routes/stockRoutes');
const currencyRoutes = require('./v2/routes/currencyRoutes');
const clientRoutes = require('./v2/routes/clientRoutes');

// API's
router.use('/items', itemsRoutes);
router.use('/prices', pricesRoutes);
router.use('/barcodes', barcodeRoutes);
router.use('/units', unitRoutes);
router.use('/divisions', divisionRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/brands', brandRoutes);
router.use('/itemUnits', itemUnitRoutes);
router.use('/attributeKeys', attributeKeyRoutes);
router.use('/attributeValues', attributeValueRoutes);
router.use('/attributes', attributeRoutes);
router.use('/stocks', stockRoutes);
router.use('/currencies', currencyRoutes);
router.use('/clients', clientRoutes);

// router.use('/currencies', currencyRoutes);

module.exports = router;
