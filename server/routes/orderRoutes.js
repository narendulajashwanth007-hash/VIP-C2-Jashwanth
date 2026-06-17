const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, cancelOrder } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, createOrder);
router.get('/:userId', verifyToken, getUserOrders);
router.post('/:id/cancel', verifyToken, cancelOrder);

module.exports = router;
