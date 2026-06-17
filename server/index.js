const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
const seedData = require('./seed');
const Product = require('./models/Product');

connectDB().then(async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Database is empty, running seed script...');
      await seedData();
    }
  } catch (err) {
    console.error('Failed to check or seed database:', err.message);
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'ShopEZ API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
