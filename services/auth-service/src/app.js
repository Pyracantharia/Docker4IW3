import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import logger from "./logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

logger.info(`Auth service starting with NODE_ENV=${process.env.NODE_ENV}`);

// Ne pas connecter MongoDB si en mode test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(cors({
  origin: '*', // Remplacez par l'URL exacte du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// on log chaque requête entrante 
app.use((req, res, next) => {
  logger.info(`Requête reçue: ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/auth', authRoutes);
// Middleware pour le logging des requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue sur le chemin : ${req.method} ${req.originalUrl}`);
  next();
});
// Routes
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid request data' });
  }
  res.json({ message: 'Utilisateur créé avec succès', token: 'dummy-token' });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'auth-service' });
});
app.get('/api/auth/ping', (req, res) => {
  res.json({ message: 'Auth service is reachable' });
});

// on gère les erreurs globales
app.use((err, req, res, next) => {
  logger.error(`Erreur serveur: ${err.message}`);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Auth service running on port ${port}`);
  });
}

export default app;