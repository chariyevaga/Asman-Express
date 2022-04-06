const express = require('express');
const routes = express.Router();
const otherContollers = require('../controllers/otherControllers');
const checkHasId = require('../../middlewares/idChecker');
/**
 * @swagger
 *  tags:
 *      name: Currencies
 *      description: All API's about currencies
 */
/**
 * @swagger
 * paths:
 *  /v2/currencies:
 *      get:
 *          tags: [Currencies]
 *          summary: List of currencies
 *          description: Getting currencies
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *          responses:
 *              200:
 *                  description: Currencies
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/currencies'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 *
 */
routes.get('/', otherContollers.getCurrencies);

/**
 * @swagger
 * paths:
 *  /v2/currencies/exchanges:
 *      get:
 *          tags: [Currencies]
 *          summary: List of exchanges
 *          description: Getting exchanges
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: include
 *                  schema:
 *                      type: string
 *                  description: Include currency **Not Required**
 *                  example: currency
 *              -   in: query
 *                  name: startDate
 *                  schema:
 *                      type: string
 *                      format: date
 *                  description: Get between startDate and endDate **Not Required**
 *              -   in: query
 *                  name: endDate
 *                  schema:
 *                      type: string
 *                      format: date
 *                  description: Get between startDate and endDate **Not Required**
 *              -   in: query
 *                  name: currencyId
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: integer
 *                  description: filter by currencyId or currencyIds **Not Required**
 *                  example: [1,2,3,4,158,159,25]
 *
 *          responses:
 *              200:
 *                  description: Currencies
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/exchanges'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
routes.get('/exchanges', otherContollers.getExchanges);

/**
 * @swagger
 * paths:
 *  /v2/currencies/{id}:
 *      get:
 *          tags: [Currencies]
 *          summary: Currency object by id
 *          description: Getting currency by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: Currency Id
 *                  schema:
 *                      type: integer
 *                      example: 158
 *          responses:
 *              200:
 *                  description: Currencies
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/currencies'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */
routes.get('/:id', checkHasId, otherContollers.getCurrencyById);

module.exports = routes;
