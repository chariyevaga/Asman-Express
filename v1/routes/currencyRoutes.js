'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const currencyControllers = require('../controllers/currencyControllers.js');
router
    .get('/', currencyControllers.getCurrencies)
    .get('/exchanges', currencyControllers.getExchanges)
    .get('/exchanges/upToday', currencyControllers.getExchangesUpToDay)
    .get('/:id', currencyControllers.getCurrencyById);

module.exports = router;
