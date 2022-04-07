const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const discountCardControllers = require('../controllers/discountCardControllers');
/**
 * @swagger
 * tags:
 *  name: DiscountCards
 *  description: All API's about discountCards
 */

/**
 * @swagger
 *  paths:
 *  /v2/discountCards:
 *      get:
 *          tags: [DiscountCards]
 *          summary: List of discountCards
 *          description: Getting discountCards.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *              -   in: query
 *                  name: type
 *                  schema:
 *                      type: string
 *                      enum: [buyDiscount, salesDiscount, purchaseCost, salesCost]
 *          responses:
 *              200:
 *                  description: DiscountCards
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/discountCards'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', discountCardControllers.getDiscountCards);

/**
 * @swagger
 *  paths:
 *  /v2/discountCards/{id}:
 *      get:
 *          tags: [DiscountCards]
 *          summary: DiscountCard object
 *          description: Getting brand Object by brand Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: DiscountCard ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: DiscountCards
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/discountCards'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */

router.get('/:id', checkHasId, discountCardControllers.getDiscountCardById);
module.exports = router;
