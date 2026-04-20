const db = require('../config/database');

// Get user's cart
const getCart = async(req, res) => {
    try {
        const [cartItems] = await db.query(
            `SELECT ci.*, p.name, p.price, p.image, p.category 
             FROM cart_items ci 
             JOIN products p ON ci.product_id = p.id 
             WHERE ci.user_id = ?`, [req.userId]
        );

        const cart = cartItems.map(item => ({
            id: item.product_id,
            name: item.name,
            price: parseFloat(item.price),
            image: item.image,
            category: item.category,
            quantity: item.quantity,
            rating: item.rating || 4.0
        }));

        res.json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add to cart
const addToCart = async(req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Check if product exists
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if item already in cart
        const [existing] = await db.query(
            'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', [req.userId, productId]
        );

        if (existing.length > 0) {
            // Update quantity
            await db.query(
                'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', [quantity, req.userId, productId]
            );
        } else {
            // Insert new item
            await db.query(
                'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [req.userId, productId, quantity]
            );
        }

        res.json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update cart item quantity
const updateCartItem = async(req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            await db.query(
                'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?', [req.userId, productId]
            );
        } else {
            await db.query(
                'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, req.userId, productId]
            );
        }

        res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Remove from cart
const removeFromCart = async(req, res) => {
    try {
        const { productId } = req.params;

        await db.query(
            'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?', [req.userId, productId]
        );

        res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Clear cart
const clearCart = async(req, res) => {
    try {
        await db.query('DELETE FROM cart_items WHERE user_id = ?', [req.userId]);
        res.json({ success: true, message: 'Cart cleared' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };