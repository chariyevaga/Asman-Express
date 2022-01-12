'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const warehouseControllers = require('../controllers/warehouseControllers.js');
router
    .get('/', warehouseControllers.getWarehouses)
    .get('/:nr', warehouseControllers.getWarehouseByNr);

module.exports = router;
