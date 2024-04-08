const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth')

/**
 * @swagger
 * /logout:
 *  post:
 *      summary: Logs out the user
 *      tags: [User Authentication with JWT]
 *      description: Logs out the authenticated user.
 *      security:
 *        - JWTAuth: [] # Use JWT token for authentication
 *      responses:
 *          '200':
 *              description: Successfully logged out
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              auth:
 *                                  type: boolean
 *                                  description: Indicates if the user is authenticated (false after logout)
 *                              token:
 *                                  type: null
 *                                  description: Null value for token after logout
 *          '500':
 *              description: Error in logging out
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: Error in logging out
 *                                  description: Error message
 */

router.post('/', auth, (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).send({ auth: false, token: null });
        console.log("Logged out successfully");
    } catch (err) {
        res.status(500).json({ message: 'Error in logging out' });
        console.log("Error in logging out");
    }
});

module.exports = router;