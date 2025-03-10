// app.js
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import cors from 'cors';

const app = express();

// Configurar CORS
app.use(cors({
    origin: "http://localhost:3001", // Permite apenas essa origem
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Se estiver usando autenticação com cookies
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/', categoryRoutes);
app.use('/api/', productRoutes);
app.use('/api/', saleRoutes);

export default app;