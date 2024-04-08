const errorHandle = async (req, res, next) => {
    try {
        let categoryArray = req.query.categoryArray || "";
        let limit = req.query.limit || 10;
        let page = req.query.page || 1;

        if (!Array.isArray(categoryArray)) {
            return res.status(400).json({ error: 'Category must be an array' });
        }

        if (!Number.isInteger(Number(limit)) || !Number.isInteger(Number(page))) {
            res.status(400).json({ message: 'Limit and page must be integers' });
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error in errorHandling' });
    }
};

module.exports = errorHandle;