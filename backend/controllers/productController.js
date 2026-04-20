const db = require('../config/database');

// Get all products
const getAllProducts = async(req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products ORDER BY id');
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get products by category
const getProductsByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const [products] = await db.query(
            'SELECT * FROM products WHERE category = ?', [category]
        );
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Search products
const searchProducts = async(req, res) => {
    try {
        const { q } = req.query;
        const [products] = await db.query(
            'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?', [`%${q}%`, `%${q}%`]
        );
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single product
const getProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [id]);

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product: products[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getAllProducts, getProductsByCategory, searchProducts, getProductById };