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
 *                  required: false
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
 *                  required: false
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
module.exports = router;
