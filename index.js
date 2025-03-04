import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

async function checkDatabaseConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    console.log("✅ Connected to Supabase PostgreSQL!");
  } catch (err) {
    console.error("❌ Failed to connect to Supabase PostgreSQL:", err);
  }
}
checkDatabaseConnection();

// Middleware
app.use(cors({
  origin: ["https://axioma-six.vercel.app", "https://newsroom-analytics-demo.vercel.app", "http://localhost:5173", "http://axioma.simppl.org"],
  methods: ["GET", "POST"]
}));
app.use(bodyParser.json());

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Express server connected to Supabase PostgreSQL!');
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // No hashing, storing plain text password
    const { error } = await supabase
      .from('users')
      .insert([{ username, password }]);

    if (error) throw error;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Directly compare the password without bcrypt
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

if (process.env.NODE_ENV !== "vercel") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;