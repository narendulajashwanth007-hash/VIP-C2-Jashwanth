const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  mainImg: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'UPI', 'Credit Card', 'Debit Card', 'Net Banking']
  },
  orderDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  deliveryDate: {
    type: String,
    default: ''
  },
  orderStatus: {
    type: String,
    default: 'Order Placed',
    enum: ['Order Placed', 'Processing', 'In Transit', 'Delivered', 'Cancelled']
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
