require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 
const http = require('http');
const initSocket = require('./socket/socket');
const app = express();
const PORT = process.env.PORT || 3000;
// Routes
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // allow all origins during development

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas!');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);

// Create server & socket connection
const server = http.createServer(app);
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Type Ctrl+C to shut down the web server');
});
