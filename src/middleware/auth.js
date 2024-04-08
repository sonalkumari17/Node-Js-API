const jwt = require('jsonwebtoken');
const SECRET_KEY = "NOTESAPI";

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            accesstoken = token.split(" ")[1];
            let user = jwt.verify(accesstoken, SECRET_KEY);
            req.userId = user.id;
            next();
        }
        else {
            res.status(401).json({ message: 'Unauthorized user' });
        }
        console.log(req.headers)
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error in authorization' });
    }
};

module.exports = auth;