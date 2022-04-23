const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const bankControllers = require('../controllers/bankControllers');
/**
 * @swagger
 * tags:
 *  name: Banks
 *  description: All API's about banks
 */

/**
 * @swagger
 *  paths:
 *  /v2/banks:
 *      get:
 *          tags: [Banks]
 *          summary: List of banks
 *          description: Getting banks.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: include
 *                  description: get bankAccounts from banks. **Not required**
 *                  schema:
 *                      example: bankAccounts
 *                      type: string
 *          responses:
 *              200:
 *                  description: Banks
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/banks'
 *                                      - type: object
 *                                        properties:
 *                                            bankAccounts:
 *                                               type: array
 *                                               items:
 *                                                  $ref: '#/components/schemas/bankAccounts'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', bankControllers.getBanks);

/**
 * @swagger
 *  paths:
 *  /v2/banks/{id}:
 *      get:
 *          tags: [Banks]
 *          summary: Bank object
 *          description: Getting bank Object by bank Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Bank ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  name: include
 *                  description: get bankAccounts from banks. **Not required**
 *                  schema:
 *                      example: bankAccounts
 *                      type: string
 *          responses:
 *              200:
 *                  description: Banks
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/banks'
 *                              - type: object
 *                                properties:
 *                                    bankAccounts:
 *                                       type: array
 *                                       items:
 *                                          $ref: '#/components/schemas/bankAccounts'
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

router.get('/:id', checkHasId, bankControllers.getBankById);

/**
 * @swagger
 *  paths:
 *      /v2/banks/input:
 *          post:
 *              tags: [Banks]
 *              summary: Input money bank
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/bankInput'
 *              responses:
 *                  200:
 *                      description: Saved
 *                  400:
 *                      description: Bad request
 *                  401:
 *                      $ref: '#/components/responses/UnauthorizedError'
 *                  500:
 *                      description: Unexpected error in server side
 *
 * components:
 *  schemas:
 *      bankInput:
 *          required:
 *              - code
 *              - date
 *              - divisionNr
 *              - transactions
 *          properties:
 *              code:
 *                  type: string
 *                  example: '~'
 *              date:
 *                  type: string
 *                  format: date
 *                  example: 2022-04-21 13:57:12
 *              divisionNr:
 *                  type: integer
 *                  example: 1
 *              specode:
 *                  type: string
 *                  example: ''
 *              employeeCode:
 *                  type: string
 *                  example: AGO
 *              projectCode:
 *                  type: string
 *                  example: ''
 *              description:
 *                  type: string
 *                  example: ''
 *              text:
 *                  type: string
 *                  description: More information
 *                  example: ''
 *              transactions:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/bankInputTransaction'
 *
 *      bankInputTransaction:
 *          required:
 *              - bankAccountCode
 *              - clientCode
 *              - amount
 *              - currencyId
 *              - currencyRate
 *          properties:
 *              bankAccountCode:
 *                  type: string
 *                  example: 102TMTPOS1
 *              clientCode:
 *                  type: string
 *                  example: 333 MONA
 *              amount:
 *                  type: number
 *                  format: flaot
 *                  example: 1000
 *              currencyId:
 *                  type: integer
 *                  example: 158
 *              currencyRate:
 *                  type: number
 *                  format: float
 *                  example: 1
 *              description:
 *                  type: string
 *                  example: ''
 *              docNumber:
 *                  type: string
 *                  example: ''
 *              docTrack:
 *                  type: string
 *                  example: ''
 *              specode:
 *                  type: string
 *                  example: ''
 *              expense:
 *                  type: object
 *                  description: Expense for transactions. if `null` its mean no expense
 *                  properties:
 *                      type:
 *                          type: string
 *                          enum: [include, exclude]
 *                      amount:
 *                          type: number
 *                          format: flaot
 *                      currencyId:
 *                          type: integer
 *                      currencyRate:
 *                          example: 1
 *                          type: number
 *                          format: float
 *                  example:
 *                      type: include
 *                      amount: 0
 *                      currencyId: 158
 *                      currencyRate: 1
 *
 */

router.post('/input', bankControllers.inputBank);
module.exports = router;
