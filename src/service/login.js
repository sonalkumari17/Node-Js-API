const registerUsersMongoClient = require('./registerSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "NOTESAPI";

const comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};

const passCompare = async (req, res) => {
    try {
        const postmanInputEmail = req.body.email;
        const postmanInputPassword = req.body.password;

        const user = await registerUsersMongoClient.findOne({ email: postmanInputEmail });
        if (user) {
            const userHashedPassword = user.password;
            console.log(userHashedPassword);

            const isMatch = await comparePasswords(postmanInputPassword, userHashedPassword);
            if (isMatch) {
                console.log('Password is correct');

                //Generating Token
                const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '24h' });

                const data = {
                    message: 'You are logged-in',
                    user: user,
                    token: token
                };
                return data;
            } else {
                console.log('Password is incorrect');
                res.status(400).json({ message: 'Incorrect Password' });
            }
        } else {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error in getting data: ', err);
        res.status(500).json({ error: 'Internal Server Error in passCompare' });
    }
};

module.exports = passCompare;