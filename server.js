const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Import routes
const todoRoutes = require('./routes/todo');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To handle JSON data in requests
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mernapp';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/todos', todoRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the MERN To-Do App API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
