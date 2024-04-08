const express = require('express');
const getUser = require('../service/authenticatedUsers')
const router = express.Router();
const auth = require('../middleware/auth');

/**
 * @swagger
 *  /getUserData:
 *    get:
 *     summary: Get user details of authenticated user only
 *     tags: [API for Authenticated Users Only]
 *     description: Retrieve details of the authenticated user
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: _id
 *         required: true
 *         description: User ID required
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 mobile:
 *                   type: string
 *                 password:
 *                   type: string             
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: Access token is missing or invalid
 *                   description: Access token is missing or invalid
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: Internal server error
 *                   description: Error message indicating internal server error
 */

router.get('/', auth,  async (req, res) => {
    const userID = await getUser(req, res);
    res.send(userID);
});

module.exports = router;