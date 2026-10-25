import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import requirementRoutes from './routes/requirementRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: '*', // Allows requests from Vercel deployment and local Next.js
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'GoPratle Requirement Flow API',
  });
});

app.use('/api/requirements', requirementRoutes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 GoPratle Backend API running at http://localhost:${PORT}`);
    console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
    console.log(`📋 Requirements API available at http://localhost:${PORT}/api/requirements`);
  });
}

startServer();
