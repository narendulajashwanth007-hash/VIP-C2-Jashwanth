const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  mainImg: {
    type: String,
    required: [true, 'Main image URL is required']
  },
  carousel: {
    type: [String],
    default: []
  },
  sizes: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Men', 'Women', 'Kids', 'Unisex']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, { timestamps: true });

// Text index for search
productSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
