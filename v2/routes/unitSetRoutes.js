const express = require('express');
const router = express.Router();

const unitControllers = require('../controllers/unitControllers');
/**
 * @swagger
 * tags:
 *  name: Units
 *  description: All API's about unitSets
 */

/**
 * @swagger
 * paths:
 *  /v2/unitSets:
 *      get:
 *          tags: [Units]
 *          summary: List of unitSets
 *          description: Getting unitSets
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: query
 *                required: false
 *                name: include
 *                description: include units **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                      enum: [units]
 *          responses:
 *              200:
 *                  description: Units
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      -   $ref: '#/components/schemas/unitSets'
 *                                      -   type: object
 *                                          properties:
 *                                              units:
 *                                                 type: array
 *                                                 items:
 *                                                     $ref: '#/components/schemas/units'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', unitControllers.getUnitSets);
module.exports = router;
