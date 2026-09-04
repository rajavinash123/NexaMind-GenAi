const express = require("express");
const userModel = require("../models/user.model");
const tokenBlackListModel = require("../models/blacklisting.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ==========================================
// REGISTER USER
// ==========================================
async function registerUserControllers(req, res) {

    // Get user data from request body
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        });
    }

    // Check whether a user already exists
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    // If user already exists, return error
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message:
                "Account already exists with this username or email. Please try another email and username"
        });
    }

    // Hash the password before storing it in database
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user in MongoDB
    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    });

    // Create JWT token
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECURET,
        {
            expiresIn: "1h"
        }
    );

    // Store JWT token inside browser cookie
    res.cookie("token", token);

    // Send successful response
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


// ==========================================
// LOGIN USER
// ==========================================
async function loginUserControllers(req, res) {

    // Get email and password from request body
    const { email, password } = req.body;

    // Find user using email
    const user = await userModel.findOne({ email });

    // If user doesn't exist
    if (!user) {
        return res.status(400).json({
            message: "Invalid email and password"
        });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    // If password is incorrect
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email and password"
        });
    }

    // Create JWT token after successful login
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECURET,
        {
            expiresIn: "1h"
        }
    );

    // Store JWT token in cookie
    res.cookie("token", token);

    // Send successful login response
    res.status(200).json({
        message: "User login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


// ==========================================
// LOGOUT USER
// ==========================================
async function logoutUserControllers(req, res) {

    // Token nikal rahe hai cookies se
    const token = req.cookies.token;

    // Agar token exist karta hai
    if (token) {

        // Token ko blacklist collection me add karo
        await tokenBlackListModel.create({
            token
        });
    }

    // Cookie se token remove karo
    res.clearCookie("token");

    // Send logout response
    res.status(200).json({
        message: "User logged out successfully"
    });
}


// ==========================================
// GET CURRENT USER
// ==========================================
async function getMeController(req, res) {

    // req.user.id middleware ke token ko decode karke aa raha hai
    const user = await userModel.findById(req.user.id);

    // User nahi mila
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Send user information
    res.status(200).json({
        message: "User info fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    registerUserControllers,
    loginUserControllers,
    logoutUserControllers,
    getMeController
};