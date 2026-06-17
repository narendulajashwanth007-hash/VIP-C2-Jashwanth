const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { userId, name, email, mobile, address, pincode, paymentMethod, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items to order'
      });
    }

    const orders = [];
    for (const item of items) {
      const order = await Order.create({
        userId,
        name,
        email,
        mobile,
        address,
        pincode,
        title: item.title,
        description: item.description,
        mainImg: item.mainImg,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        paymentMethod,
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      orders.push(order);
    }

    // Clear user's cart after order
    await Cart.deleteMany({ userId });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get orders by userId
// @route   GET /api/orders/:userId
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/admin/orders/:id
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   POST /api/orders/:id/cancel
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order status is 'Delivered'
    if (order.orderStatus === 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled as it is already delivered'
      });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder };
