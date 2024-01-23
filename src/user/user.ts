import { Pool, QueryResult } from 'pg';

export interface User {
  id: number;
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

  async updateUser(userId: string, updatedUserInfo: Partial<User>): Promise<void> {
    try {
      const result = await this.pool.query(
        'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
        [updatedUserInfo.username, updatedUserInfo.email, userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found or update failed');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  }
}
