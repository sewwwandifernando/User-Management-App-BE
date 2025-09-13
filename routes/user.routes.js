const express = require("express");
const userController = require("../controller/user.controller");
const {
    createUserValidation,
    updateUserValidation,
    userIdValidation,
    handleValidationErrors
} = require("../middleware/validation");


function userRoutes() {
    const router = express.Router();

    // Create user with validation
    router.post("/", 
        createUserValidation, 
        handleValidationErrors, 
        userController.createUser
    );

    // Get all users (no validation needed)
    router.get("/", userController.getAllUsers);

    // Get user by ID with ID validation
    router.get("/:id", 
        userIdValidation, 
        handleValidationErrors, 
        userController.getUserById
    );

    // Update user with validation
    router.put("/:id", 
        userIdValidation, 
        updateUserValidation, 
        handleValidationErrors, 
        userController.editUser
    );

    // Delete user with ID validation
    router.delete("/:id", 
        userIdValidation, 
        handleValidationErrors, 
        userController.deleteUser
    );

    return router;
}

module.exports = userRoutes();