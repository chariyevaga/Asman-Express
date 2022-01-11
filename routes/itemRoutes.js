'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const itemControllers = require('../controllers/itemControllers.js');
router
    .get('/', itemControllers.getItems)
    .get('/:id', itemControllers.getItemById)
    .get('/:id/units', itemControllers.getItemUnitsById);

module.exports = router;
