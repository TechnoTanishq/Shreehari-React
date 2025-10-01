// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allowed origins from env (comma separated). Includes localhost by default.
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5500'];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like Postman or server-to-server
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    // If you need to debug CORS failures, uncomment the next line:
    // console.error('CORS blocked origin:', origin);
    return callback(new Error('CORS policy does not allow this origin'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  // These options are now deprecated in modern Mongoose, but kept for compatibility
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// --- ROUTE HANDLERS ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/user', require('./routes/auth')); // verify this is correct
app.use('/api/products', require('./routes/products'));
app.use('/admin', require('./routes/admin'));

// Serve uploaded files (note: ephemeral on many hosts)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- GLOBAL ERROR HANDLER ---
// This will catch the path-to-regexp error during route setup and log the stack trace.
app.use((err, req, res, next) => {
    // Log the full stack trace to the deployment logs
    console.error('--- GLOBAL ERROR CAUGHT ---');
    console.error('Error Message:', err.message);
    
    // The stack trace is what you need to find the problematic file/line number
    console.error('Error Stack:', err.stack); 
    console.error('---------------------------');

    // Send a generic error response, preventing the server from crashing immediately
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: 'A server error occurred. Check logs for details.',
        // Only expose the stack trace if you are in development
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
});
// ----------------------------


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
