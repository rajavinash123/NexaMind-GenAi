// Import Express
const express = require("express");

// Import authentication controllers
const authController = require("../controllers/auth.controllers");
const authMiddleware=require("../middlewares/auth.middleware")

// Create an Express Router instance
const authRouter = express.Router();

// ==========================================
// REGISTER ROUTE
// ==========================================

// POST /register
// Calls registerUserControllers when user sends
// a POST request to /register
authRouter.post(
    "/register",
    authController.registerUserControllers
);


//login route 
//api/auth/login
authRouter.post(
    "/login",
    authController.loginUserControllers
);


//get/api/logout
//clear cookies from user cookies and add the token in blacklist

authRouter.get("/logout",authController.logoutUserControllers)



//go user req kar raha hoga uska info nikallege oruse res me send 
// hame middleware ki bhi need hoga ye check akega ki user 



//get/api/auth/get-me
//find current logedin user info
//access protected



authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

// Export router so it can be used in server/app.js
module.exports = authRouter;