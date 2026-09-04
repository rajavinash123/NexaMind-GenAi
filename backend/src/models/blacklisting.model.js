const mongoose = require("mongoose");

// ==========================================
// BLACKLIST TOKEN SCHEMA
// ==========================================
// This schema stores JWT tokens that should no longer
// be accepted by the authentication system.

const blackListingSchema = new mongoose.Schema(
    {
        token: {
            // Store the JWT token as a String
            type: String,

            // Token is required when adding it to blacklist
            required: [true, "Token is required to add in blacklisting"],
        },
    },

    // Automatically adds createdAt and updatedAt fields
    {
        timestamps: true,
    }
);

// ==========================================
// CREATE BLACKLIST TOKEN MODEL
// ==========================================
// This model will store blacklisted tokens
// inside the "blacklisttokens" MongoDB collection.

const tokenBlackListModel = mongoose.model(
    "blackListToken",
    blackListingSchema
);

// Export the model so it can be used in controllers
// and middleware.
module.exports = tokenBlackListModel;