const express = require('express');
const { createUser} = require('../service/registerService');
const router = express.Router();
/**
 * @swagger
 * /register:
 *  post:
 *      summary: This API is for user registration
 *      tags: [User Authentication with JWT]
 *      description: This API is for user registration or to create a new user
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          mobile:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: "Successfully registered a new user"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              mobile:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              _id:
 *                                  type: string
 *          '500':
 *              description: Error in registering a new user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: Error in registering a new user
 *                                  description: Error message
 */

router.post('/', async (req, res) => {
    const newUser = await createUser(req.body, res);
    res.json(newUser);
});

module.exports = router;