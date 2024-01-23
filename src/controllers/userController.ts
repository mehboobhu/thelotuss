import express, { Request, Response, Router } from 'express';
import { UserRepository } from '../models/userModel';
import { validateUserEditRequest } from '../middleware/validateRequestMiddleware';

const UserController = (userRepository: UserRepository): Router => {
  const router = express.Router();

  router.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/users', async (req: Request, res: Response) => {
    const { username, email } = req.body;
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

  // Add the necessary CORS headers for the update route
  router.put('/users/:id', validateUserEditRequest, async (req: Request, res: Response) => {
    // Ensure the request body is a valid JSON
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Invalid JSON format' });
    }

    const userId = req.params.id;
    const userData = req.body;

    try {
      // Assuming you have a method in your UserRepository to update a user
      const updatedUser = await userRepository.updateUser(userId, userData);

      // Check if the user was successfully updated
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};

export default UserController;
