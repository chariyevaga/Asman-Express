const express = require('express');
const route = express.Router();
const itemControllers = require('../controllers/itemControllers');
const checkHasId = require('../../middlewares/idChecker');

/**
 * @swagger
 *  paths:
 *  /v2/items:
 *      get:
 *          tags: [Items]
 *          summary: List of items
 *          description: Getting items.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   name: orderName
 *                  in: query
 *                  schema:
 *                      type: string
 *                      enum: [id, eCode, active, eActive, cardType, name, name2, name3, name4, specode1, specode2, specode3, specode4, specode5, keyword1, keyword2, keyword3, keyword4, keyword5, origin, category, mainUnit, mainUnitId, brandId, subsGoodCode, reyonCode, salesLimitQuantity, status]
 *              -   name: orderType
 *                  in: query
 *                  schema:
 *                      type: string
 *                      enum: [asc,desc]
 *              -   name: include
 *                  required: false
 *                  in: query
 *                  description: include brand, units, stocks, barcodes **Not Required**
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [brand, units, stocks, barcodes, attributes]
 *
 *          responses:
 *              200:
 *                  description: Items
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      -   $ref: '#/components/schemas/items'
 *                                      -   type: object
 *                                          properties:
 *                                              brand:
 *                                                  $ref: '#/components/schemas/brands'
 *                                              units:
 *                                                  type: array
 *                                                  items:
 *                                                      allOf:
 *                                                          - $ref: '#/components/schemas/units'
 *                                                          - type: object
 *                                                            properties:
 *                                                              itemUnits:
 *                                                                  $ref: '#/components/schemas/itemUnits'
 *                                              stocks:
 *                                                  type: array
 *                                                  items:
 *                                                      allOf:
 *                                                          - $ref: '#/components/schemas/stocks'
 *                                                          - type: object
 *                                                            properties:
 *                                                              warehouse:
 *                                                                  $ref: '#/components/schemas/warehouses'
 *                                              barcodes:
 *                                                  type: array
 *                                                  items:
 *                                                     $ref: '#/components/schemas/barcodes'
 *                                              attributes:
 *                                                     type: array
 *                                                     items:
 *                                                         allOf:
 *                                                             - $ref: '#/components/schemas/attributes'
 *                                                             - type: object
 *                                                               properties:
 *                                                                 attributeKey:
 *                                                                     $ref: '#/components/schemas/attributeKeys'
 *                                                                 attributeValue:
 *                                                                     $ref: '#/components/schemas/attributeValues'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/', itemControllers.getItems);

/**
 * @swagger
 *  paths:
 *  /v2/items/{id}:
 *      get:
 *          tags: [Items]
 *          summary: List of items
 *          description: Getting items.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   name: include
 *                  required: false
 *                  in: query
 *                  description: include brand, units, stocks, barcodes **Not Required**
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [brand, units, stocks, barcodes, attributes]
 *              -   name: id
 *                  required: true
 *                  in: path
 *                  description: item id
 *                  type: integer
 *
 *          responses:
 *              200:
 *                  description: Items
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                                  -   $ref: '#/components/schemas/items'
 *                                  -   type: object
 *                                      properties:
 *                                          brand:
 *                                              $ref: '#/components/schemas/brands'
 *                                          units:
 *                                              type: array
 *                                              items:
 *                                                  allOf:
 *                                                      - $ref: '#/components/schemas/units'
 *                                                      - type: object
 *                                                        properties:
 *                                                          itemUnits:
 *                                                              $ref: '#/components/schemas/itemUnits'
 *                                          stocks:
 *                                              type: array
 *                                              items:
 *                                                  allOf:
 *                                                      - $ref: '#/components/schemas/stocks'
 *                                                      - type: object
 *                                                        properties:
 *                                                          warehouse:
 *                                                              $ref: '#/components/schemas/warehouses'
 *                                          barcodes:
 *                                              type: array
 *                                              items:
 *                                                 $ref: '#/components/schemas/barcodes'
 *                                          attributes:
 *                                                 type: array
 *                                                 items:
 *                                                     allOf:
 *                                                         - $ref: '#/components/schemas/attributes'
 *                                                         - type: object
 *                                                           properties:
 *                                                             attributeKey:
 *                                                                 $ref: '#/components/schemas/attributeKeys'
 *                                                             attributeValue:
 *                                                                 $ref: '#/components/schemas/attributeValues'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id', checkHasId, itemControllers.getItemById);

/**
 * @swagger
 *  paths:
 *  /v2/items/{id}/barcodes:
 *      get:
 *          tags: [Items, Barcodes]
 *          summary: List of barcodes
 *          description: Getting barcodes by item id.
 *          parameters:
 *              -   name: include
 *                  required: false
 *                  in: query
 *                  description: include units **Not Required**
 *                  schema:
 *                      type: string
 *                      example: unit
 *              -   name: id
 *                  required: true
 *                  in: path
 *                  description: item id
 *                  type: integer
 *
 *          responses:
 *              200:
 *                  description: Divisions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/barcodes'
 *                                      - type: object
 *                                        properties:
 *                                          unit:
 *                                              $ref: '#/components/schemas/units'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id/barcodes', checkHasId, itemControllers.getBarcodesByItemId);

/**
 * @swagger
 *  paths:
 *  /v2/items/{id}/stocks:
 *      get:
 *          tags: [Items, Stocks]
 *          summary: List of stocks
 *          description: Getting stocks by item id.
 *          parameters:
 *              -   name: include
 *                  required: false
 *                  in: query
 *                  description: include units **Not Required**
 *                  schema:
 *                      type: string
 *                      example: warehouse
 *              -   name: id
 *                  required: true
 *                  in: path
 *                  description: item id
 *                  type: integer
 *
 *          responses:
 *              200:
 *                  description: Divisions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/stocks'
 *                                      - type: object
 *                                        properties:
 *                                          warehouse:
 *                                              $ref: '#/components/schemas/warehouses'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id/stocks', checkHasId, itemControllers.getStocksByItemId);

/**
 * @swagger
 *  paths:
 *  /v2/items/{id}/units:
 *      get:
 *          tags: [Items, Units]
 *          summary: List of units
 *          description: Getting units by item id.
 *          parameters:
 *              -   name: include
 *                  required: false
 *                  in: query
 *                  description: include units **Not Required**
 *                  schema:
 *                      type: string
 *                      example: barcodes
 *              -   name: id
 *                  required: true
 *                  in: path
 *                  description: item id
 *                  type: integer
 *
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
 *                                          unit:
 *                                              $ref: '#/components/schemas/units'
 *                                      - type: object
 *                                        properties:
 *                                          barcode:
 *                                              $ref: '#/components/schemas/barcodes'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id/units', checkHasId, itemControllers.getUnitsByItemId);

/**
 * @swagger
 *  paths:
 *  /v2/items/{id}/prices:
 *      get:
 *          tags: [Prices]
 *          summary: List of prices
 *          description: Getting prices by item id.
 *          parameters:
 *              -   name: type
 *                  required: true
 *                  in: query
 *                  description: all, sale - only sale prices, actualtSale - only actual sale price, purchase - all purchase price, lastPurchase - last purchase prices
 *                  schema:
 *                      type: string
 *                      enum: [all, sale, actualtSale, purchase, lastPurchase]
 *              -   name: id
 *                  required: true
 *                  in: path
 *                  description: item id
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Prices
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/prices'
 *
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id/prices', checkHasId, itemControllers.getPricesByItemId);
module.exports = route;
