const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const brandControllers = require('../controllers/brandControllers');
router.get('/', brandControllers.getBrands);
router.get('/:id', checkHasId, brandControllers.getBrandById);
module.exports = router;
