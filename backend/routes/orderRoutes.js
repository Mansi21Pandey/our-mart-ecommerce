const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');

router.use(protect);

router.post('/create', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);

module.exports = router;