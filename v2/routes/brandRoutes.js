const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const brandControllers = require('../controllers/brandControllers');
/**
 * @swagger
 * tags:
 *  name: Brands
 *  description: All API's about brands
 */

/**
 * @swagger
 *  paths:
 *  /v2/brands:
 *      get:
 *          tags: [Brands]
 *          summary: List of brands
 *          description: Getting brands.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: include
 *                  description: get items from brands. **Not required**
 *                  schema:
 *                      example: items
 *                      type: string
 *          responses:
 *              200:
 *                  description: Brands
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  allOf:
 *                                      - $ref: '#/components/schemas/brands'
 *                                      - type: object
 *                                        properties:
 *                                            items:
 *                                               type: array
 *                                               items:
 *                                                  $ref: '#/components/schemas/items'
 *
 *
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', brandControllers.getBrands);

/**
 * @swagger
 *  paths:
 *  /v2/brands/{id}:
 *      get:
 *          tags: [Brands]
 *          summary: Brand object
 *          description: Getting brand Object by brand Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Brand ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *              -   in: query
 *                  name: include
 *                  description: get items from brands. **Not required**
 *                  schema:
 *                      example: items
 *                      type: string
 *          responses:
 *              200:
 *                  description: Brands
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              allOf:
 *                              - $ref: '#/components/schemas/brands'
 *                              - type: object
 *                                properties:
 *                                    'items':
 *                                       type: array
 *                                       items:
 *                                          $ref: '#/components/schemas/items'
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

router.get('/:id', checkHasId, brandControllers.getBrandById);
module.exports = router;
