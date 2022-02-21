'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const itemControllers = require('../controllers/itemControllers.js');
router
    .get('/', itemControllers.getItems)
    .get('/:id', itemControllers.getItemById)
    .get('/:id/itemUnits', itemControllers.getItemUnitsByItemId)
    .get('/:id/barcodes', itemControllers.getBarcodesByItemId)
    .get('/:id/stocks', itemControllers.getStockByItemId);

module.exports = router;
