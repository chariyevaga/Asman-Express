'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const unitControllers = require('../controllers/unitControllers.js');
router
    .get('/', unitControllers.getUnits)
    .get('/itemUnits', unitControllers.getItemUnits)
    .get('/itemUnits', unitControllers.getItemUnits)
    .get('/:id', unitControllers.getUnitById);

module.exports = router;
