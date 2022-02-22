const express = require('express');
const route = express.Router();
const priceControllers = require('../controllers/priceControllers');
const checkHasId = require('../../middlewares/idChecker');
route
    .get('/', priceControllers.getPrices)
    .get('/:id', checkHasId, priceControllers.getPriceById)
    .get('/items/:id', checkHasId, priceControllers.getPricesByItemId)
    .get('/barcodes/:barcode', priceControllers.getPricesByBarcode);

module.exports = route;
