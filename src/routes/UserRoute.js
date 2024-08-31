const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware, authUserDetailMiddleware } = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/all", authMiddleware, userController.getAllUser);
router.get("/:id", authUserDetailMiddleware, userController.getDetailUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;