const express = require('express');
const route = express.Router();
const barcodeControllers = require('../controllers/barcodeControllers');
// const checkHasId = require('../../middlewares/idChecker');
route
    .get('/', barcodeControllers.getBarcodes)
    .get('/:data', barcodeControllers.getBarcodeByData)
    .get('/:data/item', barcodeControllers.getItemByBarcodeData)
    .get('/:data/unit', barcodeControllers.getUnitByBarcodeData)
    .get('/:data/stocks', barcodeControllers.getStocksByBarcodeData);

module.exports = route;
