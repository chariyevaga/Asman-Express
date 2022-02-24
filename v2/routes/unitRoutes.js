const express = require('express');
const router = express.Router();

const unitControllers = require('../controllers/unitControllers');
router.get('/', unitControllers.getUnits);
module.exports = router;
