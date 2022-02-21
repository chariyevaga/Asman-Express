const express = require('express');
const route = express.Router();
const itemControllers = require('../controllers/itemContorllers');
route.get('/', itemControllers.getItems);
module.exports = route;
