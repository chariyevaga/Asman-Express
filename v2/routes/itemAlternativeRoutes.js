const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const itemAlternativeControllers = require('../controllers/itemAlternativeControllers');
/**
 * @swagger
 * tags:
 *  name: Alternatives
 *  description: All API's about itemAlternatives
 */

/**
 * @swagger
 *  paths:
 *  /v2/itemAlternatives:
 *      get:
 *          tags: [Alternatives]
 *          summary: List of itemAlternatives
 *          description: Getting itemAlternatives.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: include
 *                  required: false
 *                  description: get items and alternative from itemAlternatives. **Not required**
 *                  schema:
 *                    type: array
 *                    items:
 *                        type: string
 *                        enum: [item, alternative]
 *          responses:
 *              200:
 *                  description: itemAlternatives
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/itemAlternatives'
 *                                      - type: object
 *                                        properties:
 *                                            item:
 *                                              $ref: '#/components/schemas/items'
 *                                            alternative:
 *                                              $ref: '#/components/schemas/items'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', itemAlternativeControllers.getAlternatives);

/**
 * @swagger
 *  paths:
 *  /v2/itemAlternatives/{id}:
 *      get:
 *          tags: [Alternatives]
 *          summary: alternative object
 *          description: Getting alternative Object by alternative Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: alternative ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  name: include
 *                  required: false
 *                  description: get items from itemAlternatives. **Not required**
 *                  schema:
 *                    type: array
 *                    items:
 *                        type: string
 *                        enum: [item, alternative]
 *          responses:
 *              200:
 *                  description: itemAlternatives
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/itemAlternatives'
 *                              - type: object
 *                                properties:
 *                                  item:
 *                                    $ref: '#/components/schemas/items'
 *                                  alternative:
 *                                    $ref: '#/components/schemas/items'
 *
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */

router.get('/:id', checkHasId, itemAlternativeControllers.getAlternativeById);
module.exports = router;
