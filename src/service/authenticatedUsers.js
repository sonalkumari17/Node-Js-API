const registerUsersMongoClient = require('./registerSchema');
const getUser = async (req, res) => {
    try {
        const userId = req.query._id;
        const getUserList = await registerUsersMongoClient.findOne({ _id: userId });
        console.log(getUserList);
        return getUserList;
    }
    catch (err) {
        console.error("Error in getting data: ", err);
    }
};

module.exports = getUser;