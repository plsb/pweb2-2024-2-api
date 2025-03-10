// routes/saleRoutes.js
import express from 'express';
import {
  createSale,
  getAllSales,
  getSaleById,
  getSalesByDate,
  updateSale,
  deleteSale,
} from '../controllers/saleController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/sales', authenticateToken, createSale);
router.get('/sales', authenticateToken, getAllSales);
router.get('/sales/search', authenticateToken, getSalesByDate);
router.get('/sales/:id', authenticateToken, getSaleById);
router.put('/sales/:id', authenticateToken, updateSale);
router.delete('/sales/:id',authenticateToken, deleteSale);

export default router;