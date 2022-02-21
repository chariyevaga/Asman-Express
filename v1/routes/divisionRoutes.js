'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const divisionControllers = require('../controllers/divisionControllers.js');
router
    .get('/', divisionControllers.getDivisions)
    .get('/:nr', divisionControllers.getDivisionByNr)
    .get('/:nr/warehouses', divisionControllers.getWarehousesByDivisionNr);

module.exports = router;
