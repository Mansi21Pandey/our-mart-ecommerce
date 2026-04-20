const db = require('../config/database');

// Create order from cart
const createOrder = async(req, res) => {
    try {
        // Get user's cart
        const [cartItems] = await db.query(
            `SELECT ci.*, p.name, p.price 
             FROM cart_items ci 
             JOIN products p ON ci.product_id = p.id 
             WHERE ci.user_id = ?`, [req.userId]
        );

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Generate order number
        const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

        // Create order
        const [orderResult] = await db.query(
            'INSERT INTO orders (order_number, user_id, total_amount, status) VALUES (?, ?, ?, ?)', [orderNumber, req.userId, total, 'Processing']
        );

        const orderId = orderResult.insertId;

        // Insert order items
        for (const item of cartItems) {
            await db.query(
                'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)', [orderId, item.product_id, item.name, item.quantity, item.price]
            );
        }

        // Clear cart
        await db.query('DELETE FROM cart_items WHERE user_id = ?', [req.userId]);

        // Get created order details
        const [newOrder] = await db.query(
            `SELECT o.*, oi.product_name, oi.quantity, oi.price 
             FROM orders o 
             JOIN order_items oi ON o.id = oi.order_id 
             WHERE o.id = ?`, [orderId]
        );

        // Format order response
        const order = {
            id: 'ORD' + orderId,
            items: newOrder.map(item => ({
                name: item.product_name,
                quantity: item.quantity,
                price: parseFloat(item.price)
            })),
            total: parseFloat(total),
            status: 'Processing',
            date: new Date().toLocaleDateString()
        };

        res.json({ success: true, message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get user's orders
const getUserOrders = async(req, res) => {
    try {
        const [orders] = await db.query(
            `SELECT DISTINCT o.id, o.order_number, o.total_amount, o.status, o.order_date 
             FROM orders o 
             WHERE o.user_id = ? 
             ORDER BY o.order_date DESC`, [req.userId]
        );

        const formattedOrders = [];

        for (const order of orders) {
            const [items] = await db.query(
                'SELECT product_name, quantity, price FROM order_items WHERE order_id = ?', [order.id]
            );

            formattedOrders.push({
                id: order.order_number,
                items: items.map(item => ({
                    name: item.product_name,
                    quantity: item.quantity,
                    price: parseFloat(item.price)
                })),
                total: parseFloat(order.total_amount),
                status: order.status,
                date: new Date(order.order_date).toLocaleDateString()
            });
        }

        res.json({ success: true, orders: formattedOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single order details
const getOrderById = async(req, res) => {
    try {
        const { id } = req.params;

        const [orders] = await db.query(
            'SELECT * FROM orders WHERE order_number = ? AND user_id = ?', [id, req.userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const [items] = await db.query(
            'SELECT product_name, quantity, price FROM order_items WHERE order_id = ?', [orders[0].id]
        );

        const order = {
            id: orders[0].order_number,
            items: items.map(item => ({
                name: item.product_name,
                quantity: item.quantity,
                price: parseFloat(item.price)
            })),
            total: parseFloat(orders[0].total_amount),
            status: orders[0].status,
            date: new Date(orders[0].order_date).toLocaleDateString()
        };

        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { createOrder, getUserOrders, getOrderById };