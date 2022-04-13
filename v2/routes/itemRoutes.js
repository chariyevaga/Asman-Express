const express = require('express');
const route = express.Router();
const itemControllers = require('../controllers/itemControllers');
const checkHasId = require('../../middlewares/idChecker');

/**
 * @swagger
 *  paths:
 *  /v2/items:
 *      get:
 *          tags: [Items, Alternatives]
 *          summary: List of items
 *          description: Getting items.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: orderName
 *                  schema:
 *                      type: string
 *                      enum: [id, eCode, active, eActive, cardType, name, name2, name3, name4, specode1, specode2, specode3, specode4, specode5, keyword1, keyword2, keyword3, keyword4, keyword5, origin, category, mainUnit, mainUnitId, brandId, subsGoodCode, reyonCode, salesLimitQuantity, status]
 *              -   in: query
 *                  name: orderType
 *                  schema:
 *                      type: string
 *                      enum: [asc,desc]
 *              -   in: query
 *                  required: false
 *                  name: include
 *                  description: include brand, units, stocks, barcodes **Not Required**
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [brand, units, stocks, barcodes, attributes, alternatives]
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
 *                                              alternatives:
 *                                                  type: array
 *                                                  items:
 *                                                     $ref: '#/components/schemas/items'
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
 *          tags: [Items, Alternatives]
 *          summary: List of items
 *          description: Getting items.
 *          parameters:
 *              -   in: query
 *                  required: false
 *                  name: include
 *                  description: include brand, units, stocks, barcodes **Not Required**
 *                  schema:
 *                      type: array
 *                      items:
 *                        enum: [brand, units, stocks, barcodes, attributes, alternatives]
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  description: item id
 *                  schema:
 *                      type: integer
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
 *                                          alternatives:
 *                                                  type: array
 *                                                  items:
 *                                                     $ref: '#/components/schemas/items'
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
 *              -   in: query
 *                  required: false
 *                  name: include
 *                  description: include units **Not Required**
 *                  schema:
 *                      type: string
 *                      example: unit
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  description: item id
 *                  schema:
 *                      type: integer
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
 *              -   in: query
 *                  required: false
 *                  name: include
 *                  description: include units **Not Required**
 *                  schema:
 *                      type: string
 *                      example: warehouse
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  description: item id
 *                  schema:
 *                      type: integer
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
 *              -   in: query
 *                  required: false
 *                  name: include
 *                  description: include units **Not Required**
 *                  schema:
 *                      type: string
 *                      example: barcodes
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  description: item id
 *                  schema:
 *                      type: integer
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
 *              -   in: query
 *                  required: true
 *                  name: type
 *                  description: all, sale - only sale prices, actualtSale - only actual sale price, purchase - all purchase price, lastPurchase - last purchase prices
 *                  schema:
 *                      type: string
 *                      enum: [all, sale, actualtSale, purchase, lastPurchase]
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  description: item id
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  required: false
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
 *
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.get('/:id/prices', checkHasId, itemControllers.getPricesByItemId);

/**
 * @swagger
 *  paths:
 *  /v2/items:
 *      post:
 *          tags: [Items]
 *          summary: Create New Item
 *          description: In tiger create new item
 *          requestBody:
 *              description: new item data
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  description: item code. (~ autogenerated)
 *                                  length: 24
 *                                  example: '~'
 *                                  required: true
 *                              eCode:
 *                                  type: string
 *                                  description: item code. (~ autogenerated)
 *                                  length: 24
 *                                  example: AD0012
 *                                  required: false
 *                              producerCode:
 *                                  type: string
 *                                  required: false
 *                                  example: ''
 *                              active:
 *                                  type: boolean
 *                                  example: true
 *                                  default: true
 *                              cardType:
 *                                  type: integer
 *                                  description: 1-Ticari mal, 2-Karma koli, 3-Depozitolu mal, 4-Sabit kıymet, 10-Hammadde, 11-Yarımamul, 12-Mamul, 13-Tükletim malı, 20-M.sınıfı (genel), 21-M.sınıfı (tablolu), 22-Firma dosyaları oluşturulurken default olarak eklenen malzeme sınıfı
 *                                  example: 1
 *                                  required: true
 *                              name:
 *                                  type: string
 *                                  example: 'New TLI shirt'
 *                                  required: true
 *                              name2:
 *                                  type: string
 *                                  required: false
 *                                  example: ''
 *                              name3:
 *                                  type: string
 *                                  example: ''
 *                              name4:
 *                                  type: string
 *                                  example: ''
 *                              specode1:
 *                                  length: 10
 *                                  example: ''
 *                                  type: string
 *
 *                              specode2:
 *                                  length: 10
 *                                  example: ''
 *                                  type: string
 *                              specode3:
 *                                  length: 10
 *                                  example: ''
 *                                  type: string
 *                              specode4:
 *                                  length: 10
 *                                  example: ''
 *                                  type: string
 *                              specode5:
 *                                  length: 10
 *                                  example: ''
 *                                  type: string
 *                              keyword1:
 *                                  example: ''
 *                                  type: string
 *                              keyword2:
 *                                  example: ''
 *                                  type: string
 *                              keyword3:
 *                                  example: ''
 *                                  type: string
 *                              keyword4:
 *                                  example: ''
 *                                  type: string
 *                              keyword5:
 *                                  example: ''
 *                                  type: string
 *                              origin:
 *                                  example: ''
 *                                  type: string
 *                              category:
 *                                  example: ''
 *                                  type: string
 *                                  required: false
 *                              unitSetCode:
 *                                  type: string
 *                                  required: true
 *                                  example: '05'
 *                              mainUnitCode:
 *                                  type: string
 *                                  example: ADET
 *                                  required: true
 *                              brandCode:
 *                                  type: string
 *                                  example: ''
 *                              variationCode:
 *                                  type: string
 *                              reyonCode:
 *                                  type: string
 *                              salesLimitQuantity:
 *                                  type: number
 *                          required:
 *                              - code
 *                              - cardType
 *                              - name
 *                              - unitSetCode
 *                              - mainUnitCode
 *          responses:
 *              200:
 *                  description: Prices
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/items'
 *
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
route.post('/', itemControllers.createNewItems);
module.exports = route;
