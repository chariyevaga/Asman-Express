const express = require('express');
const route = express.Router();
const otherContollers = require('../controllers/otherControllers');

/**
 * @swagger
 * paths:
 *  /v2/stocks:
 *      get:
 *          tags: [Stocks]
 *          summary: List of stock
 *          description: Getting Stocks
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: query
 *                name: include
 *                description: include warehouse, item **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                      enum: [warehouse, item]
 *          responses:
 *              200:
 *                  description: Stocks
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/stocks'
 *                                      - type: object
 *                                        properties:
 *                                            item:
 *                                              $ref: '#/components/schemas/items'
 *                                            warehouse:
 *                                              $ref: '#/components/schemas/warehouses'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */

route.get('/', otherContollers.getStocks);

/**
 * @swagger
 * paths:
 *  /v2/stocks/{data}:
 *      get:
 *          tags: [Stocks]
 *          summary: List of stock
 *          description: Getting Stocks
 *          parameters:
 *              - $ref: '#/components/parameters/limitParam'
 *              - $ref: '#/components/parameters/offsetParam'
 *              - in: path
 *                required: true
 *                name: data
 *                schema:
 *                  type: integer
 *                description: data - id of item or nr of warehouse (by type)
 *              - in: query
 *                required: true
 *                name: type
 *                schema:
 *                  type: string
 *                  enum: [warehouseNr, itemId]
 *              - in: query
 *                name: include
 *                description: include warehouse, item **Not Required**
 *                schema:
 *                    type: array
 *                    items:
 *                      enum: [warehouse, item]
 *          responses:
 *              200:
 *                  description: Stocks
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/stocks'
 *                                      - type: object
 *                                        properties:
 *                                            item:
 *                                              $ref: '#/components/schemas/items'
 *                                            warehouse:
 *                                              $ref: '#/components/schemas/warehouses'
 *              400:
 *                  description: Bad requrest
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: fail
 *                                  message:
 *                                      type: string
 *                                      anyOf:
 *                                          - example: Type most be itemId or warehousesNr
 *                                          - example: Data is required
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:data', otherContollers.getStockByData);

module.exports = route;
