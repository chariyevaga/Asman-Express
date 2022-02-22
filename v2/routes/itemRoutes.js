const express = require('express');
const route = express.Router();
const itemControllers = require('../controllers/itemContorllers');
route
    .get('/', itemControllers.getItems)
    .get('/:id', itemControllers.checkHasId, itemControllers.getItemById)
    .get(
        '/:id/barcodes',
        itemControllers.checkHasId,
        itemControllers.getBarcodesByItemId
    )
    .get(
        '/:id/stocks',
        itemControllers.checkHasId,
        itemControllers.getStocksByItemId
    )
    .get(
        '/:id/units',
        itemControllers.checkHasId,
        itemControllers.getUnitsByItemId
    )
    .get(
        '/:id/prices',
        itemControllers.checkHasId,
        itemControllers.getPricesByItemId
    );
module.exports = route;
