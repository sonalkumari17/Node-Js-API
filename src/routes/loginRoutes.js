const express = require('express');
const passCompare = require('../service/login');
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: This API is for user login
 *     tags: [User Authentication with JWT]
 *     description: User login
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "Logged in Successfully"
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
 *                 token:
 *                   type: string  
 *       '500':
 *         description: Error in logging in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: Error in logging in
 *                   description: Error message
 */


router.post('/', async (req, res) => {
    const comparedPassword = await passCompare(req, res);
    res.json(comparedPassword);
});

module.exports = router;