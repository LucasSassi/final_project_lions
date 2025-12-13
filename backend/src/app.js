import express from 'express';
import userRoutes from './routes/user.routes.js';
import carRoutes from './routes/car.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import AppError from './utils/app-error.js';

const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rotas da API
app.use('/api', userRoutes);
app.use('/api', carRoutes);

// 404 Handler - deve vir antes do error middleware
app.use((req, res, next) => {
  next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404));
});

// Error middleware - deve ser o último
app.use(errorMiddleware);

export default app;
 