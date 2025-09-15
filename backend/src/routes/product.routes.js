const express = require("express");
const { 
  createProductController, 
  getAllProductsController, 
  getSingleProductController, 
  updateProductController, 
  deleteProductController 
} = require("../controllers/product.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = express.Router();

// Public
router.get("/products", getAllProductsController);
router.get("/products/:id", getSingleProductController);

// Admin only
router.post("/products", authMiddleware, adminMiddleware, createProductController);
router.put("/products/:id", authMiddleware, adminMiddleware, updateProductController);
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProductController);

module.exports = router;
