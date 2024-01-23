import { Request, Response, NextFunction } from 'express';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (isValidCredentials(username, password)) {
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

const isValidCredentials = (username: string, password: string): boolean => {
  return username === 'testuser' && password === 'testpassword';
};
