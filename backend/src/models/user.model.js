const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: [true, "username is required"]
    },

    email: {
        type: String,
        required: true,
        unique: [true, "Account is Alredy exist with this email plese try anotner email"]
    },

    password: {
        type: String,
        required: true
    }

})

// userModel me user ke collection me data store hoga

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;