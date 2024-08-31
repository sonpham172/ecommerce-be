const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/create", authMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.get("/all", productController.getAllProduct);
router.get("/detail/:id", productController.getDetailProduct);
router.delete("/detail/:id", productController.deleteProduct);

module.exports = router;