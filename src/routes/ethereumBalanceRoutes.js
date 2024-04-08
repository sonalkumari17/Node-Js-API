const express = require('express');
const getBalance = require('../service/ethereumBalance');

const router = express.Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get Ethereum balance
 *     tags: [Ethereum Balance]
 *     parameters:
 *       - in: query
 *         name: accountAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: Ethereum account address
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: string
 *                   description: Ethereum balance in ether
 *       '400':
 *         description: Bad request, account address is missing
 *       '500':
 *         description: Error in fetching account balance from Ethereum
 */

router.get('/', async(req, res)=>{
    const { accountAddress } = req.query;
    if (!accountAddress) {
        return res.status(400).json({ error: "Account address is required" });
    }

    try {
        const balance = await getBalance(accountAddress);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
 
module.exports = router;