const express = require('express');
const route = express.Router();
const priceControllers = require('../controllers/priceControllers');
const checkHasId = require('../../middlewares/idChecker');

/**
 * @swagger
 *  paths:
 *  /v2/prices:
 *      get:
 *          tags: [Prices]
 *          summary: List of prices
 *          description: Getting prices by item id.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  required: true
 *                  name: type
 *                  description: all, sale - only sale prices, actualtSale - only actual sale price, purchase - all purchase price, lastPurchase - last purchase prices
 *                  schema:
 *                      type: string
 *                      enum: [all, sale, actualtSale, purchase, lastPurchase]
 *              -   in: query
 *                  name: include
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [currency, unit]
 *          responses:
 *              200:
 *                  description: Prices
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      -   $ref: '#/components/schemas/prices'
 *                                      -   type: object
 *                                          properties:
 *                                             currency:
 *                                                 $ref: '#/components/schemas/currencies'
 *                                             unit:
 *                                                 $ref: '#/components/schemas/units'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/', priceControllers.getPrices);

/**
 * @swagger
 *  paths:
 *  /v2/prices/{id}:
 *      get:
 *          tags: [Prices]
 *          summary: List of prices
 *          description: Getting prices by item id.
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  name: include
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [currency, unit]
 *          responses:
 *              200:
 *                  description: Prices
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      -   $ref: '#/components/schemas/prices'
 *                                      -   type: object
 *                                          properties:
 *                                             currency:
 *                                                 $ref: '#/components/schemas/currencies'
 *                                             unit:
 *                                                 $ref: '#/components/schemas/units'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id', checkHasId, priceControllers.getPriceById);

/**
 * @swagger
 *  paths:
 *  /v2/prices/items/{id}:
 *      get:
 *          tags: [Prices]
 *          summary: List of prices
 *          description: Getting prices by item id.
 *          parameters:
 *              -   in: path
 *                  description: item id
 *                  required: true
 *                  name: id
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  required: true
 *                  name: type
 *                  description: all, sale - only sale prices, actualtSale - only actual sale price, purchase - all purchase price, lastPurchase - last purchase prices
 *                  schema:
 *                      type: string
 *                      enum: [all, sale, actualtSale, purchase, lastPurchase]
 *              -   in: query
 *                  name: include
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [currency, unit]
 *          responses:
 *              200:
 *                  description: Prices
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                    allOf:
 *                                      -   $ref: '#/components/schemas/prices'
 *                                      -   type: object
 *                                          properties:
 *                                             currency:
 *                                                 $ref: '#/components/schemas/currencies'
 *                                             unit:
 *                                                 $ref: '#/components/schemas/units'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/items/:id', checkHasId, priceControllers.getPricesByItemId);

/**
 * @swagger
 *  paths:
 *  /v2/prices/barcodes/{barcode}:
 *      get:
 *          tags: [Prices]
 *          summary: List of prices
 *          description: Getting prices by item id.
 *          parameters:
 *              -   in: path
 *                  description: Barcode
 *                  required: true
 *                  name: barcode
 *                  schema:
 *                      type: string
 *                  example: 8699106167070
 *              -   in: query
 *                  required: true
 *                  name: type
 *                  description: all, sale - only sale prices, actualtSale - only actual sale price, purchase - all purchase price, lastPurchase - last purchase prices
 *                  schema:
 *                      type: string
 *                      enum: [all, sale, actualtSale, purchase, lastPurchase]
 *              -   in: query
 *                  name: include
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [currency, unit]
 *          responses:
 *              200:
 *                  description: Prices
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                    allOf:
 *                                      -   $ref: '#/components/schemas/prices'
 *                                      -   type: object
 *                                          properties:
 *                                             currency:
 *                                                 $ref: '#/components/schemas/currencies'
 *                                             unit:
 *                                                 $ref: '#/components/schemas/units'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/barcodes/:barcode', priceControllers.getPricesByBarcode);

module.exports = route;
