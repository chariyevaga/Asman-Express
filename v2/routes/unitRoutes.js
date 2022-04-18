const express = require('express');
const router = express.Router();

const unitControllers = require('../controllers/unitControllers');
/**
 * @swagger
 * tags:
 *  name: Units
 *  description: All API's about units
 */

/**
 * @swagger
 * paths:
 *  /v2/units:
 *      get:
 *          tags: [Units]
 *          summary: List of units
 *          description: Getting units
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: query
 *                name: include
 *                description: include units **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                      enum: [unitSet]
 *          responses:
 *              200:
 *                  description: Units
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      -   $ref: '#/components/schemas/units'
 *                                      -   type: object
 *                                          properties:
 *                                              unitSet:
 *                                                  $ref: '#/components/schemas/unitSets'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', unitControllers.getUnits);
module.exports = router;
