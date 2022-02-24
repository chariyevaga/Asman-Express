const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const divisionControllers = require('../controllers/divisionControllers');
router.get('/', divisionControllers.getDivisions);
router.get('/:id', checkHasId, divisionControllers.getDivisionById);
module.exports = router;
