import { Pool, QueryResult } from 'pg';

export interface User {
  id: string;
  username: string;
  email: string;
}

export class UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const result: QueryResult = await this.pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      const userInfo: User | undefined = result.rows[0];
      return userInfo || null;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }

  async updateUser(userId: string, updatedUserInfo: Partial<User>): Promise<boolean> {
    try {
      const result = await this.pool.query(
        'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
        [updatedUserInfo.username, updatedUserInfo.email, userId]
      );

      return result.rows.length > 0;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async createUser(username: string, email: string): Promise<boolean> {
    try {
      const result = await this.pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
        [username, email]
      );

      return result.rows.length > 0;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const result = await this.pool.query<User>('SELECT * FROM users');
      return result.rows;
    } catch (error) {
      console.error('Error retrieving all users:', error);
      throw error;
    }
  }
}

export default UserRepository;
