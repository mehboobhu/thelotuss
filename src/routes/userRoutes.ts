import express, { Request, Response } from 'express';
import { UserRepository } from '../models/userModel';
import { User } from '../models/userModel';
import { basicAuth } from '../middleware/authMiddleware';
import { validateUserEditRequest } from '../middleware/validateRequestMiddleware';
import { pool } from '../db'; 

const router = express.Router();
const userRepository = new UserRepository(pool);


router.use(basicAuth);

router.get('/api/users', async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/users', async (req, res) => {
  const { username, email } = req.body as User;

  try {
    const success = await userRepository.createUser(username, email);

    if (success) {
      res.json({ message: 'User created successfully' });
    } else {
      res.status(400).json({ error: 'Failed to create user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/api/user/:userId', validateUserEditRequest, async (req, res) => {
  const userId = req.params.userId;
  const updatedUserInfo = req.body as Partial<User>;

  try {
    const success = await userRepository.updateUser(userId, updatedUserInfo);

    if (success) {
      res.json({ message: 'User information updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found or update failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
