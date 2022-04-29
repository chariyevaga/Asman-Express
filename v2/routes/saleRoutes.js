const express = require('express');
const router = express.Router();
const saleControllers = require('../controllers/saleControllers');

/**
 * @swagger
 *  paths:
 *  /v2/sales:
 *      post:
 *          tags: [Sales]
 *          summary: Create Sale Fiche
 *          description: Creating sale fiche
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          allOf:
 *                              -   $ref: '#/components/schemas/salePostSchema'
 *                              -   type: object
 *                                  properties:
 *                                      lines:
 *                                          type: array
 *                                          required: true
 *                                          items:
 *                                              anyOf:
 *                                                  - $ref: '#/components/schemas/saleItem'
 *                                                  - $ref: '#/components/schemas/salePromotion'
 *                                                  - $ref: '#/components/schemas/saleDiscount'
 *                                                  - $ref: '#/components/schemas/saleExpense'
 *                                                  - $ref: '#/components/schemas/saleService'
 *                                      underLines:
 *                                          type: array
 *                                          required: true
 *                                          items:
 *                                              anyOf:
 *                                                  - $ref: '#/components/schemas/salePromotion'
 *                                                  - $ref: '#/components/schemas/saleDiscount'
 *                                                  - $ref: '#/components/schemas/saleExpense'
 *          responses:
 *              200:
 *                  description: Saved
 *              400:
 *                  description: Bad request
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 * components:
 *  schemas:
 *      salePostSchema:
 *          required:
 *              - code
 *              - date
 *              - clientCode
 *              - divisionNr
 *              - warehouseNr
 *          properties:
 *              code:
 *                  type: string
 *                  default: '~'
 *              date:
 *                  type: string
 *                  format: date
 *                  default: '2022-04-14 14:15:44'
 *              clientCode:
 *                  type: string
 *                  default: 333 MONA
 *              divisionNr:
 *                  type: integer
 *                  default: 1
 *              warehouseNr:
 *                  type: integer
 *                  default: 11
 *              employeeCode:
 *                  type: string
 *                  description: SalesManCode - Satish eleman kodu
 *                  example: ''
 *              docNumber:
 *                  type: string
 *                  description: Belge Numarasi
 *                  example: ''
 *              docTrack:
 *                  type: string
 *                  description: Documan Izleme numarasi
 *                  example: ''
 *              projectCode:
 *                  type: string
 *                  description: Proje kodu
 *                  example: ''
 *              note1:
 *                  type: string
 *                  description: Detaylar>aciklama
 *                  example: ''
 *              note2:
 *                  type: string
 *                  description: Detaylar>aciklama
 *                  example: ''
 *              note3:
 *                  type: string
 *                  description: Detaylar>aciklama
 *                  example: ''
 *              note4:
 *                  type: string
 *                  description: Detaylar>aciklama
 *                  example: ''
 *              note5:
 *                  type: string
 *                  description: Detaylar>aciklama
 *                  example: ''
 *              note6:
 *                  type: string
 *                  description: Detaylar>aciklama
 *                  example: ''
 *              text:
 *                  type: string
 *                  description: Detaylar bilgi
 *                  example: ''
 *              specode:
 *                  type: string
 *                  example: ''
 *              authCode:
 *                  type: string
 *                  discription: Yetki kody
 *                  example: ''
 *
 *      saleItem:
 *          required:
 *              - type
 *              - code
 *              - quantity
 *              - unitCode
 *              - price
 *              - priceCurrencyId
 *              - priceCurrencyRate
 *          properties:
 *              type:
 *                  type: integer
 *                  default: 0
 *                  description: Item type is 0 (0.Items, 1.Promotion, 2.Discounts, 3.Expenses, 4.Services)
 *              code:
 *                  type: string
 *                  default: '100200300'
 *                  description: Item Code
 *              unitCode:
 *                  type: string
 *                  default: ADET
 *                  description: Item Unit Code
 *              quantity:
 *                  type: number
 *                  format: flaot
 *                  default: 3
 *              price:
 *                  type: number
 *                  format: flaot
 *                  default: 23.30
 *              priceCurrencyId:
 *                  type: integer
 *                  description: price Currency Id
 *                  default: 158
 *              priceCurrencyRate:
 *                  type: number
 *                  format: flaot
 *                  default: 1
 *                  description: >
 *                                  if currency not TMT rate of TMT to currency
 *                                  EXP: if price  7 USD ```{price: 7, priceCurrencyId:1, priceCurrencyRate: 19.6}```
 *              description:
 *                  type: string
 *                  example: Line description
 *      salePromotion:
 *          required:
 *              - type
 *              - code
 *              - quantity
 *              - unitCode
 *              - price
 *              - priceCurrencyId
 *              - priceCurrencyRate
 *          properties:
 *              type:
 *                  type: integer
 *                  default: 1
 *                  description: Promotion type is 1 (0.Items, 1.Promotion, 2.Discounts, 3.Expenses, 4.Services)
 *              code:
 *                  type: string
 *                  default: '100200300'
 *                  description: Item Code
 *
 *              unitCode:
 *                  type: string
 *                  default: ADET
 *                  description: Item Unit Code
 *              quantity:
 *                  type: number
 *                  format: flaot
 *                  default: 1
 *              price:
 *                  type: number
 *                  format: flaot
 *                  default: 15.40
 *              priceCurrencyId:
 *                  type: integer
 *                  description: price Currency Id
 *                  default: 158
 *              priceCurrencyRate:
 *                  type: number
 *                  format: flaot
 *                  default: 1
 *                  description: >
 *                                  if currency not TMT rate of TMT to currency
 *                                  EXP: if price  7 USD ```{price: 7, priceCurrencyId:1, priceCurrencyRate: 19.6}```
 *              description:
 *                  type: string
 *                  example: Line description
 *
 *
 *      saleDiscount:
 *          required:
 *              - type
 *              - discount
 *          properties:
 *              type:
 *                  type: integer
 *                  default: 2
 *                  description: Descount type is 2 (0.Items, 1.Promotion, 2.Discounts, 3.Expenses, 4.Services)
 *              code:
 *                  type: string
 *                  default: 'IN01'
 *                  description: (discountCartds.type - 2)
 *              discount:
 *                  type: object
 *                  required:
 *                      - type
 *                      - value
 *                  properties:
 *                      type:
 *                          type: string
 *                          enum: [amount, percentage]
 *                          default: amount
 *                      value:
 *                          type: float
 *                          default: 20.00
 *                          description: if type is amount then 20 TMT else 20%
 *              description:
 *                  type: string
 *                  example: Line description
 *
 *      saleExpense:
 *          required:
 *              - type
 *              - expense
 *          properties:
 *              type:
 *                  type: integer
 *                  default: 3
 *                  description: Descount type is 3 (0.Items, 1.Promotion, 2.Discounts, 3.Expenses, 4.Services)
 *              code:
 *                  type: string
 *                  default: DOSTAVKA
 *                  description: disocuntCartCode (discountCartds.type - 4)
 *              expense:
 *                  type: object
 *                  required:
 *                      - type
 *                      - value
 *                  properties:
 *                      type:
 *                          type: string
 *                          enum: [amount, percentage]
 *                          default: amount
 *                      value:
 *                          type: float
 *                          default: 20.00
 *                          description: if type is amount then 20 TMT else 20%
 *              description:
 *                  type: string
 *                  example: Line description
 *
 *      saleService:
 *          required:
 *              - type
 *              - quantity
 *              - unitCode
 *              - price
 *              - priceCurrencyId
 *              - priceCurrencyRate
 *          properties:
 *              type:
 *                  type: integer
 *                  default: 4
 *                  description: Service type is 4 (0.Items, 1.Promotion, 2.Discounts, 3.Expenses, 4.Services)
 *              code:
 *                  type: string
 *                  default: 'ARASSACYLYK'
 *                  description: Item Code
 *              unitCode:
 *                  type: string
 *                  default: ADET
 *                  description: Item Unit Code
 *              quantity:
 *                  type: number
 *                  format: flaot
 *                  default: 1
 *              price:
 *                  type: number
 *                  format: flaot
 *                  default: 15.40
 *              priceCurrencyId:
 *                  type: integer
 *                  description: price Currency Id
 *                  default: 158
 *              priceCurrencyRate:
 *                  type: number
 *                  format: flaot
 *                  default: 1
 *                  description: >
 *                                  if currency not TMT rate of TMT to currency
 *                                  EXP: if price  7 USD ```{price: 7, priceCurrencyId:1, priceCurrencyRate: 19.6}```
 *              description:
 *                  type: string
 *                  example: Line description
 */
router.post('/', saleControllers.createNewSale);
module.exports = router;
