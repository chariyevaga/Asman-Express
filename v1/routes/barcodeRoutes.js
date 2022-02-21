'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const barcodeControllers = require('../controllers/barcodeControllers.js');
router
    .get('/', barcodeControllers.getBarcodes)
    .get('/:id', barcodeControllers.getBarcodeById)
    .get('/:barcode/item', barcodeControllers.getItemByBarcode)
    .get('/:barcode/unit', barcodeControllers.getUnitByBarcode)
    .get('/:barcode/itemUnit', barcodeControllers.getItemUnitByBarcode)
    .get('/:barcode/stocks', barcodeControllers.getStocksByBarcode);

module.exports = router;
