//routes/categoryRoutes.js
import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para categorias
router.post('/categories', authenticateToken, createCategory);
router.get('/categories', authenticateToken, getAllCategories);
router.get('/categories/search', authenticateToken, getCategoryByName);
router.get('/categories/:id', authenticateToken, getCategoryById);
router.put('/categories/:id', authenticateToken, updateCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

export default router;