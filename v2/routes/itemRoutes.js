const express = require('express');
const route = express.Router();
const itemControllers = require('../controllers/itemControllers');
const checkHasId = require('../../middlewares/idChecker');
route
    .get('/', itemControllers.getItems)
    .get('/:id', checkHasId, itemControllers.getItemById)
    .get('/:id/barcodes', checkHasId, itemControllers.getBarcodesByItemId)
    .get('/:id/stocks', checkHasId, itemControllers.getStocksByItemId)
    .get('/:id/units', checkHasId, itemControllers.getUnitsByItemId)
    .get('/:id/prices', checkHasId, itemControllers.getPricesByItemId);
module.exports = route;
