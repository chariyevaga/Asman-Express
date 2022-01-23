'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const priceControllers = require('../controllers/priceControllers.js');
router
    .get('/', priceControllers.getAllPrices)
    .get('/now', priceControllers.getPriceNow);

module.exports = router;
