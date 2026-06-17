const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/:userId', verifyToken, getCartItems);
router.post('/', verifyToken, addToCart);
router.put('/:id', verifyToken, updateCartItem);
router.delete('/:id', verifyToken, deleteCartItem);

module.exports = router;
