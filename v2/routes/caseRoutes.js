const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const caseControllers = require('../controllers/caseControllers');
/**
 * @swagger
 * tags:
 *  name: Cases
 *  description: All API's about cases
 */

/**
 * @swagger
 *  paths:
 *  /v2/cases:
 *      get:
 *          tags: [Cases]
 *          summary: List of cases
 *          description: Getting cases.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: include
 *                  description: get division and currency from cases. **Not required**
 *                  schema:
 *                      type: array
 *                      items:
 *                          enum: [division, currency]
 *          responses:
 *              200:
 *                  description: Cases
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/cases'
 *                                      - type: object
 *                                        properties:
 *                                            division:
 *                                               $ref: '#/components/schemas/divisions'
 *                                            currency:
 *                                               $ref: '#/components/schemas/currencies'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', caseControllers.getCases);

/**
 * @swagger
 *  paths:
 *  /v2/cases/{id}:
 *      get:
 *          tags: [Cases]
 *          summary: Case object
 *          description: Getting case Object by case Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Case ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  name: include
 *                  description: get division and currency from cases. **Not required**
 *                  schema:
 *                      type: array
 *                      items:
 *                          enum: [division, currency]
 *          responses:
 *              200:
 *                  description: Cases
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/cases'
 *                              - type: object
 *                                properties:
 *                                  division:
 *                                     $ref: '#/components/schemas/divisions'
 *                                  currency:
 *                                     $ref: '#/components/schemas/currencies'
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

router.get('/:id', checkHasId, caseControllers.getCaseById);
/**
 * @swagger
 *  paths:
 *  /v2/cases/input:
 *      post:
 *          tags: [Cases]
 *          summary: Input money case
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/caseInput'
 *          responses:
 *              200:
 *                  description: Saved
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 *
 * components:
 *  schemas:
 *      caseInput:
 *          required:
 *              - caseCode
 *              - number
 *              - code
 *              - date
 *              - clientCode
 *              - divisionNr
 *              - amount
 *              - currencyId
 *              - currencyRate
 *          properties:
 *              caseCode:
 *                  type: string
 *              number:
 *                  type: string
 *                  description: Case fiche number
 *              code:
 *                  type: string
 *              date:
 *                  type: string
 *                  format: date
 *              clientCode:
 *                  type: string
 *              divisionNr:
 *                  type: integer
 *              amount:
 *                  type: number
 *                  format: float
 *              currencyId:
 *                  type: integer
 *              currencyRate:
 *                  type: number
 *                  format: float
 *              description:
 *                  type: string
 *              text:
 *                  type: string
 *              employeeCode:
 *                  type: string
 *              docNumber:
 *                  type: string
 *              specode:
 *                  type: string
 *          example:
 *              caseCode: 101TMT01
 *              number: '~'
 *              code: '~'
 *              date: 2022-04-18 13:45:33
 *              clientCode: 320TM.TMT0001
 *              divisionNr: 1
 *              amount: 1234.50
 *              currencyId: 158
 *              currencyRate: 1
 *              description: This is description
 *              text: More information about case input
 *              employeeCode: 'AGO'
 *              docNumber: ''
 *              specode: ''
 */

router.post('/input', caseControllers.inputCase);
module.exports = router;
