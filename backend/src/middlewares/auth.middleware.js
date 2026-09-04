const jwt = require("jsonwebtoken");
const tokenBlackLListModel = require("../models/blacklisting.model");

async function authUser(req, res, next) {

    // Cookie se token nikal rahe hain
    const token = req.cookies.token;

    // Agar token nahi hai to protected route access nahi kar sakte
    if (!token) {
        return res.status(401).json({
            message: "Token is not provided. Token is required to access protected routes"
        });
    }

    // Check karo token blacklist mein hai ya nahi
    const isTokenBlackListed = await tokenBlackLListModel.findOne({
        token
    });

    // Agar token blacklist mein hai to access deny karo
    if (isTokenBlackListed) {
        return res.status(401).json({
            message: "Token is invalid"
        });
    }

    try {

        // JWT token verify karo
        const decode = jwt.verify(
            token,
            process.env.JWT_SECURET
        );

        // Decoded user information request ke andar store karo
        req.user = decode;

        // Next middleware/controller par jao
        next();

    } catch (err) {

        // Token invalid ya expired hai
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    authUser
};