const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.get("/users", UserController.getUsers);
router.get("/user/:id", UserController.getUserById);
router.post("/user", UserController.store);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

module.exports = router;
