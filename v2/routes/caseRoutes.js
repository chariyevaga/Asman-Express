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
module.exports = router;
