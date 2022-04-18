const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const bankControllers = require('../controllers/bankControllers');

/**
 * @swagger
 *  paths:
 *  /v2/bankAccounts:
 *      get:
 *          tags: [Banks]
 *          summary: List of bankAccounts
 *          description: Getting bankAccounts.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: include
 *                  description: get bank and currency from bankAccounts. **Not required**
 *                  schema:
 *                      type: array
 *                      items:
 *                          enum: [bank, currency]
 *          responses:
 *              200:
 *                  description: BankAccounts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/bankAccounts'
 *                                      - type: object
 *                                        properties:
 *                                            bank:
 *                                               $ref: '#/components/schemas/banks'
 *                                            currency:
 *                                               $ref: '#/components/schemas/currencies'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', bankControllers.getBankAccounts);

/**
 * @swagger
 *  paths:
 *  /v2/bankAccounts/{id}:
 *      get:
 *          tags: [Banks]
 *          summary: BankAccount object
 *          description: Getting BankAccount Object by bank Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Bank ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  name: include
 *                  description: get bank and currency from bankAccounts. **Not required**
 *                  schema:
 *                      type: array
 *                      items:
 *                          enum: [bank, currency]
 *          responses:
 *              200:
 *                  description: BankAccounts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/bankAccounts'
 *                              - type: object
 *                                properties:
 *                                  bank:
 *                                      $ref: '#/components/schemas/banks'
 *                                  currency:
 *                                      $ref: '#/components/schemas/currencies'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */

router.get('/:id', checkHasId, bankControllers.getBankAccountById);
module.exports = router;
