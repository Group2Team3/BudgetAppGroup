const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BudgetApp',
  password: process.env.PASSWD_POSTGRES,
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

// GET endpoint to retrieve all budgets
app.get('/api/budgets', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Budget');
    res.json(result.rows);
  } catch (error) {
    console.error('Error handling GET budgets request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint to create a new budget
app.post('/api/budgets', async (req, res) => {
  const { Budget_acc_id, Budget_income, Budget_bills, Budget_cost_of_life, Budget_insurance, Budget_family, Budget_car, Budget_public_trans, Budget_entertainment, Budget_vacations, Budget_expenses, Budget_summary } = req.body;

  try {
    const result = await client.query
    ('INSERT INTO Budget (Budget_acc_id, Budget_income, Budget_bills, Budget_cost_of_life, Budget_insurance, Budget_family, Budget_car, Budget_public_trans, Budget_entertainment, Budget_vacations, Budget_expenses, Budget_summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', 
    [Budget_acc_id, Budget_income, Budget_bills, Budget_cost_of_life, Budget_insurance, Budget_family, Budget_car, Budget_public_trans, Budget_entertainment, Budget_vacations, Budget_expenses, Budget_summary]);

    res.json({ message: 'Budget created successfully', budget: result.rows[0] });
  } catch (error) {
    console.error('Error handling POST budget request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//get endpoint to retrieve a single budget
app.get('/api/budgets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('SELECT * FROM Budget WHERE Budget_acc_id = $1', [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    console.error('Error handling GET budget request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// PUT endpoint to update a budget
app.put('/api/budgets/:id', async (req, res) => {
  const { id } = req.params;
  const { Budget_income, Budget_bills, Budget_cost_of_life, Budget_insurance, Budget_family, Budget_car, Budget_public_trans, Budget_entertainment, Budget_vacations, Budget_expenses, Budget_summary } = req.body;

  try {
    const result = await client.query(
      'UPDATE Budget SET Budget_income = $2, Budget_bills = $3, Budget_cost_of_life = $4, Budget_insurance = $5, Budget_family = $6, Budget_car = $7, Budget_public_trans = $8, Budget_entertainment = $9, Budget_vacations = $10, Budget_expenses = $11, Budget_summary = $12 WHERE Budget_acc_id = $1 RETURNING *',
      [id, Budget_income, Budget_bills, Budget_cost_of_life, Budget_insurance, Budget_family, Budget_car, Budget_public_trans, Budget_entertainment, Budget_vacations, Budget_expenses, Budget_summary]
    );

    if (result.rows.length > 0) {
      res.json({ message: 'Budget updated successfully', budget: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    console.error('Error handling PUT budget request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint to create a new expense
app.post('/api/expenses', async (req, res) => {
  const { Expense_cst_id, Expense_name, Expense_amount, Expense_date, Expense_category, Expense_desc, Expense_receipt_id } = req.body;

  try {
    const result = await client.query
    ('INSERT INTO Expenses (Expense_cst_id, Expense_name, Expense_amount, Expense_date, Expense_category, Expense_desc, Expense_receipt_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
    [Expense_cst_id, Expense_name, Expense_amount, Expense_date, Expense_category, Expense_desc, Expense_receipt_id]);

    res.json({ message: 'Expense created successfully', expense: result.rows[0] });
  } catch (error) {
    console.error('Error handling POST expense request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Expenses');
    res.json(result.rows);
  } catch (error) {
    console.error('Error handling GET expenses request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get endpoint to retrieve expenses for a single customer
app.get('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('SELECT * FROM Expenses WHERE Expense_cst_id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error handling GET expenses request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
