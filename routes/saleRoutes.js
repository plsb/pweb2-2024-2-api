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

const router = express.Router();

router.post('/sales', createSale);
router.get('/sales', getAllSales);
router.get('/sales/search', getSalesByDate);
router.get('/sales/:id', getSaleById);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

export default router;