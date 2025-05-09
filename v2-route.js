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
const unitSetRoutes = require('./v2/routes/unitSetRoutes');
const itemUnitRoutes = require('./v2/routes/itemUnitRoutes');
const divisionRoutes = require('./v2/routes/divisionRoutes');
const warehouseRoutes = require('./v2/routes/warehouseRoutes');
const brandRoutes = require('./v2/routes/brandRoutes');
const attributeKeyRoutes = require('./v2/routes/attributeKeyRoutes');
const attributeValueRoutes = require('./v2/routes/attributeValueRoutes');
const attributeRoutes = require('./v2/routes/attributeRoutes');
const stockRoutes = require('./v2/routes/stockRoutes');
const currencyRoutes = require('./v2/routes/currencyRoutes');
const clientRoutes = require('./v2/routes/clientRoutes');
const serviceCardRoutes = require('./v2/routes/serviceCardRoutes');
const discountCardRoutes = require('./v2/routes/discountCardRoutes');
const bankRoutes = require('./v2/routes/bankRoutes');
const bankAccountRoutes = require('./v2/routes/bankAccountRoutes');
const caseRoutes = require('./v2/routes/caseRoutes');
const employeeRoutes = require('./v2/routes/employeeRoutes');
const itemAlternativeRoutes = require('./v2/routes/itemAlternativeRoutes');
const saleRoutes = require('./v2/routes/saleRoutes');
// API's
router.use('/items', itemsRoutes);
router.use('/prices', pricesRoutes);
router.use('/barcodes', barcodeRoutes);
router.use('/units', unitRoutes);
router.use('/itemUnits', itemUnitRoutes);
router.use('/unitSets', unitSetRoutes);
router.use('/divisions', divisionRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/brands', brandRoutes);
router.use('/attributeKeys', attributeKeyRoutes);
router.use('/attributeValues', attributeValueRoutes);
router.use('/attributes', attributeRoutes);
router.use('/stocks', stockRoutes);
router.use('/currencies', currencyRoutes);
router.use('/clients', clientRoutes);
router.use('/serviceCards', serviceCardRoutes);
router.use('/discountCards', discountCardRoutes);
router.use('/banks', bankRoutes);
router.use('/bankAccounts', bankAccountRoutes);
router.use('/cases', caseRoutes);
router.use('/employees', employeeRoutes);
router.use('/itemAlternatives', itemAlternativeRoutes);
router.use('/sales', saleRoutes);

module.exports = router;
