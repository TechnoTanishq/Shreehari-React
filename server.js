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
// 🚀 Allow all origins (not secure, but fine for educational project)
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
app.use('/api/user', require('./routes/auth')); // check if you really want this
app.use('/api/products', require('./routes/products'));
app.use('/admin', require('./routes/admin'));

// Serve uploaded files (⚠️ note: files won’t persist on Render after restart)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default route (important for Render health checks)
app.get('/', (req, res) => {
  res.send('🚀 Backend running successfully on Render!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
