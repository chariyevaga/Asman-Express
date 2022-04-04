const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const warehouseControllers = require('../controllers/warehouseControllers');

/**
 * @swagger
 * tags:
 *  name: Warehouses
 *  description: All API's about warehouses
 */

/**
 * @swagger
 *  paths:
 *  /v2/warehouses:
 *      get:
 *          tags: [Warehouses]
 *          summary: List of warehouses
 *          description: Getting warehouses.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   name: include
 *                  in: query
 *                  required: false
 *                  description: get division information. **Not required**
 *                  schema:
 *                      example: division
 *                      type: string
 *          responses:
 *              200:
 *                  description: warehouses
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/warehouses'
 *                                      - type: object
 *                                        properties:
 *                                            division:
 *                                              $ref: '#/components/schemas/divisions'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', warehouseControllers.getWarehouses);

/**
 * @swagger
 *  paths:
 *  /v2/warehouses/{id}:
 *      get:
 *          tags: [Warehouses]
 *          summary: Warehouse object
 *          discription: Getting warehouse Object by warehouse Id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  discription: Warehouse ID
 *                  required: true
 *              -   name: include
 *                  in: query
 *                  required: false
 *                  description: get division information. **Not required**
 *                  schema:
 *                      example: warehouses
 *                      type: string
 *          responses:
 *              200:
 *                  description: Warehouses
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/warehouses'
 *                              - type: object
 *                                properties:
 *                                    warehouses:
 *                                       type: array
 *                                       items:
 *                                          $ref: '#/components/schemas/warehouses'
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
router.get('/:id', checkHasId, warehouseControllers.getWarehouseById);
module.exports = router;
