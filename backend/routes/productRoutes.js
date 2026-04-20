const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory, searchProducts, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

module.exports = router;