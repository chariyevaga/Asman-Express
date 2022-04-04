const express = require('express');
const router = express.Router();

const unitControllers = require('../controllers/unitControllers');
/**
 * @swagger
 * tags:
 *  name: Unites
 *  description: All API's about units
 */

/**
 * @swagger
 * paths:
 *  /v2/units:
 *      get:
 *          tags: [Unites]
 *          summary: List of units
 *          description: Getting units
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *          responses:
 *              200:
 *                  description: Units
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/units'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', unitControllers.getUnits);
module.exports = router;
