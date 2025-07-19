const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubham:XEhbqsmjt4cnACyz@cluster0.ewetbgm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get("/",(req,res)=>{
  res.send("hlw worlld")
})

// Import Product model
const Product = require('./model/Product');

// POST endpoint to save product customization
app.post('/api/save-product', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save product', details: err });
  }
});

// GET endpoint to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err });
  }
});

// GET endpoint to fetch a specific product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 