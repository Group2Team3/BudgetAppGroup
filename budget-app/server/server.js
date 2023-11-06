const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BudgetApp',
  password: 'admin',
  port: 5432,
});

client.connect();

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());

// app.get('/api/users', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM users');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error querying the database:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/api/users', async (req, res) => {
    console.log('Received data:', req.body); // Log received data
    const { email, password } = req.body;

    try {
      // Perform user authentication logic with the received data
      const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  
      if (result.rows.length > 0) {
        // User authenticated successfully
        res.json({ message: 'Login successful', user: result.rows[0] });
      } else {
        // User not found or incorrect credentials
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error handling login request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// app.post('/api/users', async (req, res) => {
//     const { email, password } = req.body;
  
//     // Perform any necessary logic with the received data
  
//     res.json({ message: 'POST request to /api/users received successfully' });
//   });


app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      // User with the same email already exists
      res.status(400).json({ error: 'User with this email already exists' });
    } else {
      // If the user doesn't exist, insert a new user into the database
      const result = await client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);

      res.json({ message: 'Registration successful', user: result.rows[0] });
    }
  } catch (error) {
    console.error('Error handling registration request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
