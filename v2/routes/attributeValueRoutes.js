const express = require('express');
const router = express.Router();
const attributeControllers = require('../controllers/attributeControllers');

/**
 * @swagger
 * paths:
 *  /v2/attributeValues:
 *      get:
 *          tags: [Attributes]
 *          summary: List of attributeValues
 *          description: Getting attributeValues
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - name: include
 *                required: false
 *                in: query
 *                description: include attributeKey **Not Required**
 *                schema:
 *                    type: string
 *                    example: attributeKey
 *          responses:
 *              200:
 *                  description: attributValues
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/attributeValues'
 *                                      - type: object
 *                                        properties:
 *                                            attributeKey:
 *                                              $ref: '#/components/schemas/attributeKeys'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', attributeControllers.getAttributeValues);
module.exports = router;
