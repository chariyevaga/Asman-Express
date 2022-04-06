const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const serviceCardControllers = require('../controllers/serviceCardControllers');
/**
 * @swagger
 * tags:
 *  name: ServiceCards
 *  description: All API's about serviceCards
 */

/**
 * @swagger
 *  paths:
 *  /v2/serviceCards:
 *      get:
 *          tags: [ServiceCards]
 *          summary: List of serviceCards
 *          description: Getting serviceCards.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: type
 *                  schema:
 *                      type: string
 *                      enum: [receivedServices, providedServices]
 *          responses:
 *              200:
 *                  description: ServiceCards
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/serviceCards'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', serviceCardControllers.getServiceCards);

/**
 * @swagger
 *  paths:
 *  /v2/serviceCards/{id}:
 *      get:
 *          tags: [ServiceCards]
 *          summary: ServiceCard object
 *          description: Getting brand Object by brand Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: ServiceCard ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: ServiceCards
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/serviceCards'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */

router.get('/:id', checkHasId, serviceCardControllers.getServiceCardById);
module.exports = router;
