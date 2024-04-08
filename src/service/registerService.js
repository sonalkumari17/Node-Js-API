const registerUsersMongoClient = require('./registerSchema');
const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
};

// creating a new user or registration/signUp function
const createUser = async (users, res) => {
    try {
        const existingUser = await registerUsersMongoClient.findOne({ email: users.email });
        if (existingUser) {
            return { message: "User already exist" };
        };

        const hashedPassword = await hashPassword(users.password);
        const savedUser = new registerUsersMongoClient({
            name: users.name,
            email: users.email,
            mobile: users.mobile,
            password: hashedPassword,
        });

        await savedUser.save();
        console.log("User data Saved Successfully!!!");
        return savedUser;
    } catch (err) {
        console.error("Error in saving user data", err);
        res.json({ error: err });
    }
};

module.exports = { createUser, hashPassword };