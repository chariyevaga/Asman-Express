const express = require('express');
const route = express.Router();
const barcodeControllers = require('../controllers/barcodeControllers');
// const checkHasId = require('../../middlewares/idChecker');

/**
 * @swagger
 * tags:
 *  name: Barcodes
 *  description: All API's about barcodes
 */

/**
 * @swagger
 *  paths:
 *  /v2/barcodes:
 *      get:
 *          tags: [Barcodes]
 *          summary: List of barcodes
 *          description: Getting barcodes.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *          responses:
 *              200:
 *                  description: Barcodes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/barcodes'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/', barcodeControllers.getBarcodes);

/**
 * @swagger
 *  paths:
 *  /v2/barcodes/{data}:
 *      get:
 *          tags: [Barcodes]
 *          summary: List of barcodes
 *          description: Getting barcodes.
 *          parameters:
 *              -   in: query
 *                  name: type
 *                  required: true
 *                  description: data type. (id or barcode)
 *                  schema:
 *                      type: string
 *                      enum: [id, barcode]
 *                      default: barcode
 *              -   in: path
 *                  required: true
 *                  name: data
 *                  schema:
 *                      type: string
 *                  description: id (barcode.id = 6 - if type is id) or barcode (barcode.barcode = 8699106167070 - if type is barcode)
 *                  example:  8699106167070
 *              -   in: query
 *                  required: false
 *                  name: include
 *                  description: include items, units **Not Required**
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: string
 *                          enum: [items, units]
 *          responses:
 *              200:
 *                  description: Barcodes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/barcodes'
 *                                  - type: object
 *                                    properties:
 *                                      item:
 *                                          $ref: '#/components/schemas/items'
 *                                      itemUnit:
 *                                          allOf:
 *                                              -  $ref: '#/components/schemas/itemUnits'
 *                                              -  type: object
 *                                                 properties:
 *                                                  unit:
 *                                                      $ref: '#/components/schemas/units'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */

route.get('/:data', barcodeControllers.getBarcodeByData);

/**
 * @swagger
 *  paths:
 *  /v2/barcodes/{data}/item:
 *      get:
 *          tags: [Barcodes, Items]
 *          summary: Item by barcode
 *          description: Getting item by barcode data (id or barcode).
 *          parameters:
 *              -   in: query
 *                  name: type
 *                  required: true
 *                  description: data type. (id or barcode)
 *                  schema:
 *                      type: string
 *                      enum: [id, barcode]
 *                      default: barcode
 *              -   in: path
 *                  required: true
 *                  name: data
 *                  schema:
 *                      type: string
 *                  description: id (barcode.id = 6) or barcode (barcode.barcode = 8699106167070)
 *                  example:  8699106167070
 *          responses:
 *              200:
 *                  description: Barcodes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/items'
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:data/item', barcodeControllers.getItemByBarcodeData);

/**
 * @swagger
 *  paths:
 *  /v2/barcodes/{data}/unit:
 *      get:
 *          tags: [Barcodes, Units]
 *          summary: Unit by barcode
 *          description: Getting unit by barcode data (id or barcode).
 *          parameters:
 *              -   in: query
 *                  name: type
 *                  required: true
 *                  description: data type. (id or barcode)
 *                  schema:
 *                      type: string
 *                      enum: [id, barcode]
 *                      default: barcode
 *              -   in: path
 *                  required: true
 *                  name: data
 *                  schema:
 *                      type: string
 *                  description: id (barcode.id = 6) or barcode (barcode.barcode = 8699106167070)
 *                  example:  8699106167070
 *          responses:
 *              200:
 *                  description: Barcodes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                                  -  $ref: '#/components/schemas/itemUnits'
 *                                  -  type: object
 *                                     properties:
 *                                      unit:
 *                                          $ref: '#/components/schemas/units'
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:data/unit', barcodeControllers.getUnitByBarcodeData);

/**
 * @swagger
 *  paths:
 *  /v2/barcodes/{data}/stocks:
 *      get:
 *          tags: [Barcodes, Stocks]
 *          summary: Stocks by barcode
 *          description: Getting unit by barcode data (id or barcode).
 *          parameters:
 *              -   in: query
 *                  name: type
 *                  required: true
 *                  description: data type. (id or barcode)
 *                  schema:
 *                      type: string
 *                      enum: [id, barcode]
 *                      default: barcode
 *              -   in: path
 *                  required: true
 *                  name: data
 *                  schema:
 *                      type: string
 *                  description: id (barcode.id = 6) or barcode (barcode.barcode = 8699106167070)
 *                  example:  8699106167070
 *          responses:
 *              200:
 *                  description: Barcodes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                                  -  $ref: '#/components/schemas/stocks'
 *                                  -  type: object
 *                                     properties:
 *                                      unit:
 *                                          $ref: '#/components/schemas/warehouses'
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:data/stocks', barcodeControllers.getStocksByBarcodeData);

module.exports = route;
