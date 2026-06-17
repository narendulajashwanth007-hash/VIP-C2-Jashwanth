const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Admin = require('../models/Admin');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ usertype: 'customer' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update banner
// @route   POST /api/admin/banner
const updateBanner = async (req, res) => {
  try {
    const { banner } = req.body;

    let adminConfig = await Admin.findOne();
    if (!adminConfig) {
      adminConfig = await Admin.create({ banner });
    } else {
      adminConfig.banner = banner;
      await adminConfig.save();
    }

    res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      banner: adminConfig.banner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update categories
// @route   POST /api/admin/categories
const updateCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    let adminConfig = await Admin.findOne();
    if (!adminConfig) {
      adminConfig = await Admin.create({ categories });
    } else {
      adminConfig.categories = categories;
      await adminConfig.save();
    }

    res.status(200).json({
      success: true,
      message: 'Categories updated successfully',
      categories: adminConfig.categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get admin config (banner, categories)
// @route   GET /api/admin/config
const getAdminConfig = async (req, res) => {
  try {
    let adminConfig = await Admin.findOne();
    if (!adminConfig) {
      adminConfig = await Admin.create({});
    }

    res.status(200).json({
      success: true,
      config: adminConfig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getDashboard, getAllUsers, updateBanner, updateCategories, getAdminConfig };
