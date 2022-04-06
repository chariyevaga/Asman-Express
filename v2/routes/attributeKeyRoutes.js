const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const attributeControllers = require('../controllers/attributeControllers');

/**
 * @swagger
 * tags:
 *  name: Attributes
 *  description: All API's about item attributes
 */

/**
 * @swagger
 * paths:
 *  /v2/attributeKeys:
 *      get:
 *          tags: [Attributes]
 *          summary: List of attributeKeys
 *          description: Getting attributeKeys
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: query
 *                name: include
 *                required: false
 *                description: attributeValues **Not Required**
 *                schema:
 *                    type: string
 *                    example: attributeValues
 *          responses:
 *              200:
 *                  description: attributKeys
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/attributeKeys'
 *                                      - type: object
 *                                        properties:
 *                                            attributeValues:
 *                                              type: array
 *                                              items:
 *                                                  $ref: '#/components/schemas/attributeValues'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', attributeControllers.getAttributeKeys);

module.exports = router;
