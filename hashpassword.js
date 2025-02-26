import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const hashAndStorePasswords = async () => {
  try {
    // Get all users with plaintext passwords (Modify this if needed)
    const users = await pool.query('SELECT id, username, password FROM users');

    for (let user of users.rows) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    }

    console.log('Passwords hashed successfully');
    process.exit();
  } catch (error) {
    console.error('Error hashing passwords:', error);
    process.exit(1);
  }
};

// Run the function
hashAndStorePasswords();
