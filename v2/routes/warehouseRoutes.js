const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const warehouseControllers = require('../controllers/warehouseControllers');
router.get('/', warehouseControllers.getWarehouses);
router.get('/:id', checkHasId, warehouseControllers.getWarehouseById);
module.exports = router;
