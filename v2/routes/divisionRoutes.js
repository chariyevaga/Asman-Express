const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const divisionControllers = require('../controllers/divisionControllers');
/**
 * @swagger
 * tags:
 *  name: Divisions
 *  description: All API's about divisions
 */

/**
 * @swagger
 *  paths:
 *  /v2/divisions:
 *      get:
 *          tags: [Divisions]
 *          summary: List of divisions
 *          description: Getting divisions.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   name: include
 *                  in: query
 *                  required: false
 *                  description: get warehouses from divisions. **Not required**
 *                  schema:
 *                      example: warehouses
 *                      type: string
 *          responses:
 *              200:
 *                  description: Divisions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/divisions'
 *                                      - type: object
 *                                        properties:
 *                                            warehouses:
 *                                               type: array
 *                                               items:
 *                                                  $ref: '#/components/schemas/warehouses'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', divisionControllers.getDivisions);

/**
 * @swagger
 *  paths:
 *  /v2/divisions/{id}:
 *      get:
 *          tags: [Divisions]
 *          summary: Division object
 *          discription: Getting division Object by division Id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  discription: Division ID
 *                  required: true
 *              -   name: include
 *                  in: query
 *                  required: false
 *                  description: get warehouses from divisions. **Not required**
 *                  schema:
 *                      example: warehouses
 *                      type: string
 *          responses:
 *              200:
 *                  description: Divisions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/divisions'
 *                              - type: object
 *                                properties:
 *                                    warehouses:
 *                                       type: array
 *                                       items:
 *                                          $ref: '#/components/schemas/warehouses'
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
router.get('/:id', checkHasId, divisionControllers.getDivisionById);
module.exports = router;
