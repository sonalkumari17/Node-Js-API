const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sonalkumari1210:nodejsassesment@cluster0.db6ebjw.mongodb.net/nodejsassesment?retryWrites=true&w=majority&appName=AtlasApp", { useNewUrlParser: true, useunifiedTopology: true })
    .then(() => console.log("Connection Successfull registerSchema!!!"))
    .catch((err) => console.log(err));

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [ // Validate email format using regex
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        match: [ // Validate mobile format using regex
            /^\d{10}$/,
            'Please enter a valid 10-digit mobile number'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    }

});
// Creating model
const registerUsersMongoClient = mongoose.model('users', registerSchema);
module.exports = registerUsersMongoClient;