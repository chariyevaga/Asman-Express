const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const unitControllers = require('../controllers/unitControllers');

/**
 * @swagger
 * paths:
 *  /v2/itemUnits:
 *      get:
 *          tags: [Units]
 *          summary: List of units
 *          description: Getting units
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: query
 *                name: include
 *                description: include items, barcode **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                        type: string
 *                        enum: [item, unit, barcode]
 *          responses:
 *              200:
 *                  description: Units
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/itemUnits'
 *                                      - type: object
 *                                        properties:
 *                                            item:
 *                                              $ref: '#/components/schemas/items'
 *                                            barcode:
 *                                              $ref: '#/components/schemas/barcodes'
 *                                            unit:
 *                                              $ref: '#/components/schemas/units'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', unitControllers.getItemUnits);

/**
 * @swagger
 * paths:
 *  /v2/itemUnits/{id}:
 *      get:
 *          tags: [Units]
 *          summary: List of units
 *          description: Getting units
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: path
 *                required: true
 *                name: id
 *                schema:
 *                  type: integer
 *              - in: query
 *                name: include
 *                description: include items, barcode **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                        type: string
 *                        enum: [item, unit, barcode]
 *          responses:
 *              200:
 *                  description: Units
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/itemUnits'
 *                                  - type: object
 *                                    properties:
 *                                        item:
 *                                          $ref: '#/components/schemas/items'
 *                                        barcode:
 *                                          $ref: '#/components/schemas/barcodes'
 *                                        unit:
 *                                          $ref: '#/components/schemas/units'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/:id', checkHasId, unitControllers.getItemUnitById);
module.exports = router;
