const express = require('express');
const router = express.Router();
const attributeControllers = require('../controllers/attributeControllers');

/**
 * @swagger
 * paths:
 *  /v2/attributes:
 *      get:
 *          tags: [Attributes]
 *          summary: List of attributes
 *          description: Getting attributes
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - name: include
 *                in: query
 *                description: include attributeKey, attributeValue, item **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                      enum: [attributeKey, attributeValue, item]
 *          responses:
 *              200:
 *                  description: attributes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/attributes'
 *                                      - type: object
 *                                        properties:
 *                                            attributeKey:
 *                                              $ref: '#/components/schemas/attributeKeys'
 *                                            attributeValue:
 *                                              $ref: '#/components/schemas/attributeValues'
 *                                            item:
 *                                              $ref: '#/components/schemas/items'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', attributeControllers.getAttributes);
module.exports = router;
