const express = require('express');
const { fetchData } = require('../service/dataRetrival');
const router = express.Router();
const errorHandle = require('../middleware/errorHandling');

/**
 * @swagger
 * /dataRetrieve:
 *  get:
 *     summary: Fetch data from the provided public API
 *     tags: [API for Data Retrieval]
 *     description: Getting data from the public API
 *     parameters:
 *       - in: query
 *         name: categoryArray
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           example: ["Animals", "Anime"]
 *         description: Filter data by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Set the limit of number of objects
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Show the result of this specific page
 *     responses:
 *       '200':
 *         description: List of data from the API
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   API:
 *                     type: string
 *                     description: The name of the API
 *                   Description:
 *                     type: string
 *                     description: The name of the data item
 *                   Auth:
 *                      type: string
 *                   HTTP:
 *                      type: string
 *                   Cors:
 *                      type: string
 *                   Link:
 *                      type: string
 *                   Category:
 *                     type: string
 *                     description: The category of the data item
 *                   
 *       '500':
 *         description: Error in fetching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: Error in fetching data 
 *                   description: Error message
 */ 

router.get('/', errorHandle, async(req, res)=> {   
    const categoryArray = req.query.categoryArray || "";
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1 ) *limit;

    let data = await fetchData(categoryArray, limit, skip); 
    res.json(data);
});

module.exports = router;