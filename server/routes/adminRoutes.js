const express = require('express');
const router = express.Router();
const { getDashboard, getAllUsers, updateBanner, updateCategories, getAdminConfig } = require('../controllers/adminController');
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/adminMiddleware');

// All admin routes require auth + admin
router.use(verifyToken, verifyAdmin);

router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
router.get('/config', getAdminConfig);
router.post('/banner', updateBanner);
router.post('/categories', updateCategories);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;
