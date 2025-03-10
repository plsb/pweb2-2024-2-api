// routes/productRoutes.js
import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByName,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/products', authenticateToken, createProduct);
router.get('/products', authenticateToken, getAllProducts);
router.get('/products/search', authenticateToken, getProductsByName);
router.get('/products/category', authenticateToken, getProductsByCategory);
router.get('/products/:id', authenticateToken, getProductById);
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

export default router;