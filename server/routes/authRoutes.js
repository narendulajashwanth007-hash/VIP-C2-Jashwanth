const express = require('express');
const router = express.Router();
const { register, login, toggleWishlist, getWishlist } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/wishlist/toggle', verifyToken, toggleWishlist);
router.get('/wishlist', verifyToken, getWishlist);

module.exports = router;
