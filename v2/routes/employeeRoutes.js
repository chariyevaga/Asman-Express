const express = require('express');
const router = express.Router();
const checkHasId = require('../../middlewares/idChecker');
const employeeControllers = require('../controllers/employeeControllers');
/**
 * @swagger
 * tags:
 *  name: Employees
 *  description: All API's about employees
 */

/**
 * @swagger
 *  paths:
 *  /v2/employees:
 *      get:
 *          tags: [Employees]
 *          summary: List of employees
 *          description: Getting employees.
 *          parameters:
 *              -   $ref: '#/components/parameters/limitParam'
 *              -   $ref: '#/components/parameters/offsetParam'
 *          responses:
 *              200:
 *                  description: Employees
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                 $ref: '#/components/schemas/employees'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 */
router.get('/', employeeControllers.getEmployees);

/**
 * @swagger
 *  paths:
 *  /v2/employees/{id}:
 *      get:
 *          tags: [Employees]
 *          summary: Employee object
 *          description: Getting employee Object by employee Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Employee ID
 *                  required: true
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Employees
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/employees'
 *              400:
 *                  $ref: '#/components/responses/PathIdRequiredError'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  $ref: '#/components/responses/NotFoundError'
 *              500:
 *                  description: Unexpected error in server side
 */

router.get('/:id', checkHasId, employeeControllers.getEmployeeById);
module.exports = router;
