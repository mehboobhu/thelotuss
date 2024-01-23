import { Request, Response, NextFunction } from 'express';

export const validateUserEditRequest = (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  next();
};

