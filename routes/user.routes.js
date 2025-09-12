const express = require("express");
const userController = require("../controller/user.controller");

function userRoutes() {
    const router = express.Router();
    router.post("/", userController.createUser);
    router.get("/", userController.getAllUsers);
    router.get("/:id", userController.getUserById);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);
    return router;
}

module.exports = userRoutes;