const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- CORS CONFIG -------------------- */
// ✅ Allowed origins: add your Netlify site here
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [
      'http://localhost:5173', 
      'http://127.0.0.1:5500',
      'https://shreehari-jewellers.netlify.app/'
    ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow server-to-server or Postman
//     if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
//     return callback(new Error(`CORS policy does not allow origin: ${origin}`));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors()); 
// Handle preflight requests
app.options('*', cors());
/* ----------------------------------------------------- */

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));

// ⚠️ Double check this: using auth routes for /api/user
app.use('/api/user', require('./routes/auth')); 

app.use('/api/products', require('./routes/products'));
app.use('/admin', require('./routes/admin'));

// Serve uploaded files (note: ephemeral on Render)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
