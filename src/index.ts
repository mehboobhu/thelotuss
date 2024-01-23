import express from 'express';
import cors from 'cors'; // Add this line
import { pool } from './db';
import UserController from './controllers/userController';
import { UserRepository } from './models/userModel';
import dotenv from 'dotenv';
import { basicAuth } from './middleware/authMiddleware';
dotenv.config();

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/api', basicAuth);

const userRepository = new UserRepository(pool);
const userController = UserController(userRepository);

// Handle preflight OPTIONS for all routes
app.options('*', cors());

// Specify allowed headers
app.use(cors({ origin: 'http://localhost:3001', allowedHeaders: ['Authorization', 'Content-Type'] }));

app.use('/api', userController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export const BASE_URL = 'http://localhost:3000/api';
