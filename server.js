// server.js - RESTful Product API for Week 2 Assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------
//  Middleware
// ----------------------

// JSON parser middleware
app.use(bodyParser.json());

// Custom logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validKey = process.env.API_KEY || 'mysecretkey'; // Example key
  if (!apiKey || apiKey !== validKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
};

// ----------------------
//  In-memory products DB
// ----------------------
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// ----------------------
//  Root route
// ----------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// ----------------------
// Validation Middleware
// ----------------------
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Missing or invalid product fields' });
  }
  next();
};

// ----------------------
//  CRUD Routes
// ----------------------

// GET all products (with filtering, pagination, and search)
app.get('/api/products', (req, res) => {
  const { category, search, page = 1, limit = 5 } = req.query;
  let results = [...products];

  // Filtering
  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Searching
  if (search) {
    results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // Pagination
  const start = (page - 1) * limit;
  const paginatedResults = results.slice(start, start + parseInt(limit));

  res.json({
    total: results.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedResults,
  });
});

// GET a single product by ID
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.json(product);
});

// POST - Create new product
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Update a product
app.put('/api/products/:id', authenticate, validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE - Remove a product
app.delete('/api/products/:id', authenticate, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', deleted });
});

// ----------------------
// Product Statistics
// ----------------------
app.get('/api/products-stats', (req, res) => {
  const stats = {};
  for (const product of products) {
    stats[product.category] = (stats[product.category] || 0) + 1;
  }
  res.json(stats);
});

// ----------------------
//  Error Handling Middleware
// ----------------------
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// ----------------------
//  Start server
// ----------------------
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});

// Export app for testing
module.exports = app;
