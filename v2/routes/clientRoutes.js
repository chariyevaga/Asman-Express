const express = require('express');
const routes = express.Router();
const clientControllers = require('../controllers/clientControllers');
const checkHasId = require('../../middlewares/idChecker');
/**
 * @swagger
 *  tags:
 *      name: Clients
 *      description: All API's about cleints
 */

/**
 * @swagger
 * paths:
 *  /v2/clients:
 *      get:
 *          tags: [Clients]
 *          summery: List of clients
 *          description: Getting clients
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *          responses:
 *              200:
 *                  description: Clients
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/clients'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 *
 */
routes.get('/', clientControllers.getClients);

/**
 * @swagger
 * paths:
 *  /v2/clients/{id}:
 *      get:
 *          tags: [Clients]
 *          summery: Client Object by id
 *          description: Getting client by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  type: integer
 *                  description: Client Id
 *          responses:
 *              200:
 *                  description: Clients
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/clients'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 *
 */
routes.get('/:id', checkHasId, clientControllers.getClientById);

module.exports = routes;
