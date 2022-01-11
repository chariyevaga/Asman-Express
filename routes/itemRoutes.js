'use strict';
const express = require('express');
const router = express.Router({
    caseInsensitive: true,
});

const itemControllers = require('../controllers/itemControllers.js');
router.get('/', itemControllers.getItems);

module.exports = router;
