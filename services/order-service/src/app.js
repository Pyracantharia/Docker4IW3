import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import orderRoutes from './routes/orderRoutes.js';
import logger from "./logger.js"; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

logger.info(`Order service starting with NODE_ENV=${process.env.NODE_ENV}`);

// Connexion à la base de données seulement si pas en mode test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(cors());
app.use(express.json());

// on log chaque requête entrante 
app.use((req, res, next) => {
  logger.info(`Requête reçue: ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'order-service' });
});

// on gère les erreurs globales
app.use((err, req, res, next) => {
  logger.error(`Erreur serveur: ${err.message}`);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Order service running on port ${port}`);
  });
}

export default app;