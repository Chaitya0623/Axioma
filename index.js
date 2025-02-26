import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["https://newsroom-analytics-demo.vercel.app", "http://localhost:5173"], 
  methods: ["GET", "POST"]
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Express server connected to PostgreSQL!');
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
