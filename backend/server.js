const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ SERVE FRONTEND FILES ============
// This is CRITICAL - serves your HTML/CSS/JS files

// ✅ This looks in the parent folder (your-project/frontend/)
// Serve frontend files from the parent folder
const frontendPath = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    console.log(`✅ Frontend files served from: ${frontendPath}`);
} else {
    console.log(`⚠️ Frontend folder not found at: ${frontendPath}`);
}

// ============ IMAGE SERVING ============
// Change from looking in current directory to looking in parent directory
const imageLocations = [
    path.join(__dirname, '..', 'images'), // Parent/images
    path.join(__dirname, '..', 'frontend/images'), // Parent/frontend/images
    path.join(__dirname, 'images') // Backend/images (if any)
];

let activeImagePath = null;
for (const location of imageLocations) {
    if (fs.existsSync(location)) {
        activeImagePath = location;
        break;
    }
}

if (activeImagePath) {
    app.use('/images', express.static(activeImagePath));
    console.log(`✅ Images served from: ${activeImagePath}`);
} else {
    // Create images folder
    activeImagePath = path.join(__dirname, 'images');
    if (!fs.existsSync(activeImagePath)) {
        fs.mkdirSync(activeImagePath, { recursive: true });
    }
    app.use('/images', express.static(activeImagePath));
    console.log(`📁 Created and serving images from: ${activeImagePath}`);
    console.log('⚠️  Note: Add your .jpeg files to this folder!');
}

// ============ IN-MEMORY STORAGE ============
let users = [];
let carts = {};
let orders = [];
let nextUserId = 1;

// Add a test user
users.push({
    id: nextUserId++,
    name: "Test User",
    email: "test@example.com",
    password: "123456",
    created_at: new Date()
});

// ============ PRODUCT DATA ============
const products = [
    { id: 1, name: "Lenovo Laptop", price: 86990, category: "electronics", image: "/images/lenovo.jpeg", rating: 4.8 },
    { id: 2, name: "HP Laptop", price: 75490, category: "electronics", image: "/images/hp.jpeg", rating: 4.5 },
    { id: 3, name: "Asus Vivobook", price: 39956, category: "electronics", image: "/images/asus.jpeg", rating: 4.1 },
    { id: 4, name: "Sony Headphones", price: 3989, category: "electronics", image: "/images/headphone.jpeg", rating: 4.7 },
    { id: 5, name: "Sony Bravia TV", price: 919000, category: "electronics", image: "/images/tv.jpeg", rating: 3.9 },
    { id: 6, name: "Atomberg Fan", price: 3599, category: "electronics", image: "/images/fan.jpeg", rating: 4.2 },
    { id: 7, name: "Voltas AC", price: 46500, category: "electronics", image: "/images/ac.jpeg", rating: 4.5 },
    { id: 8, name: "Platform Heels", price: 4000, category: "footwear", image: "/images/platform.jpeg", rating: 3.6 },
    { id: 9, name: "Pencil Heels", price: 3000, category: "footwear", image: "/images/pencil.jpeg", rating: 4.6 },
    { id: 10, name: "Boot Heels", price: 7000, category: "footwear", image: "/images/boot.jpeg", rating: 3.8 },
    { id: 11, name: "Sneakers", price: 5000, category: "footwear", image: "/images/sneakers.jpeg", rating: 4.2 },
    { id: 12, name: "Shoes", price: 4000, category: "footwear", image: "/images/shoes.jpeg", rating: 4.9 },
    { id: 13, name: "Slippers", price: 4000, category: "footwear", image: "/images/slippers.jpeg", rating: 4.1 },
    { id: 14, name: "Shirt", price: 800, category: "fashion", image: "/images/shirt.jpeg", rating: 3.2 },
    { id: 15, name: "T-Shirt", price: 200, category: "fashion", image: "/images/tshirt.jpeg", rating: 4.0 },
    { id: 16, name: "Wedding Wear", price: 5689, category: "fashion", image: "/images/weeding.jpeg", rating: 4.7 },
    { id: 17, name: "Kurti", price: 400, category: "fashion", image: "/images/kurti.jpeg", rating: 4.3 },
    { id: 18, name: "Anarkali Suit", price: 963, category: "fashion", image: "/images/anarkali.jpeg", rating: 4.6 },
    { id: 19, name: "Saree", price: 700, category: "fashion", image: "/images/saree.jpeg", rating: 4.4 },
    { id: 20, name: "Jumpsuit", price: 1500, category: "fashion", image: "/images/jumpsuit.jpeg", rating: 3.6 },
    { id: 21, name: "Cap", price: 1500, category: "fashion", image: "/images/cap.jpeg", rating: 3.8 },
    { id: 22, name: "Mixer Grinder", price: 4000, category: "home", image: "/images/mixer.jpeg", rating: 4.6 },
    { id: 23, name: "Hawking Cookers", price: 3500, category: "home", image: "/images/cooker.jpeg", rating: 4.8 },
    { id: 24, name: "Cutlery", price: 4800, category: "home", image: "/images/cutlery.jpeg", rating: 4.0 },
    { id: 25, name: "Mama's Earth Cream", price: 500, category: "beauty", image: "/images/mcream.jpeg", rating: 4.8 },
    { id: 26, name: "Face Wash", price: 300, category: "beauty", image: "/images/facewash.jpeg", rating: 4.5 },
    { id: 27, name: "Shampoo", price: 800, category: "beauty", image: "/images/shampoo.jpeg", rating: 4.3 },
    { id: 28, name: "Eye Shadow", price: 500, category: "beauty", image: "/images/eye.jpeg", rating: 4.0 },
    { id: 29, name: "School Bag", price: 2000, category: "bags", image: "/images/school.jpeg", rating: 4.0 },
    { id: 30, name: "Purse", price: 2000, category: "bags", image: "/images/purse.jpeg", rating: 4.8 },
    { id: 31, name: "Wallet", price: 1000, category: "bags", image: "/images/wallet.jpeg", rating: 4.0 }
];

// ============ HELPER FUNCTIONS ============
function getUserFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    try {
        const userId = parseInt(Buffer.from(token, 'base64').toString().split('-')[0]);
        return users.find(u => u.id === userId);
    } catch (e) {
        return null;
    }
}

function generateToken(userId) {
    return Buffer.from(`${userId}-${Date.now()}`).toString('base64');
}

// ============ AUTH ROUTES ============
app.post('/api/auth/signup', (req, res) => {
    console.log('Signup request:', req.body.email);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = { id: nextUserId++, name, email, password, created_at: new Date() };
    users.push(newUser);
    const token = generateToken(newUser.id);

    res.status(201).json({
        success: true,
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});

app.post('/api/auth/login', (req, res) => {
    console.log('Login request:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);

    res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email }
    });
});

// ============ PRODUCTS ROUTE ============
app.get('/api/products', (req, res) => {
    res.json({ success: true, products });
});

// ============ CART ROUTES ============
app.get('/api/cart', (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

    res.json({ success: true, cart: carts[user.id] || [] });
});

app.post('/api/cart/add', (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const { productId, quantity = 1 } = req.body;
    const product = products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (!carts[user.id]) carts[user.id] = [];

    const existingItem = carts[user.id].find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts[user.id].push({...product, quantity });
    }

    res.json({ success: true, message: 'Item added to cart' });
});

app.delete('/api/cart/:productId', (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const productId = parseInt(req.params.productId);
    if (carts[user.id]) {
        carts[user.id] = carts[user.id].filter(item => item.id !== productId);
    }

    res.json({ success: true, message: 'Item removed from cart' });
});

// ============ ORDER ROUTES ============
app.post('/api/orders/create', (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const { items, total, address } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const orderNumber = 'ORD' + Date.now();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const newOrder = {
        id: orderNumber,
        items,
        total,
        status: 'Processing',
        date: new Date().toLocaleDateString(),
        userEmail: user.email,
        userName: user.name,
        address,
        estimatedDelivery: deliveryDate.toLocaleDateString()
    };

    orders.push(newOrder);
    carts[user.id] = []; // Clear cart

    res.json({ success: true, message: 'Order placed successfully', order: newOrder });
});

app.get('/api/orders', (req, res) => {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const userOrders = orders.filter(o => o.userEmail === user.email);
    res.json({ success: true, orders: userOrders });
});

// ============ CONTACT ROUTE ============
app.post('/api/contact/submit', (req, res) => {
    console.log('Contact message:', req.body);
    res.json({ success: true, message: 'Message sent successfully' });
});

// ============ DEFAULT ROUTE ============
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running! Visit /api/products for products' });
});

// Default route - serves index.html from frontend folder
// ============ DEFAULT ROUTE ============
app.get('/', (req, res) => {
    // Check if frontend exists and serve it
    const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.json({ message: 'E-commerce API is running! Visit /api/products for products' });
    }
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📦 API URL: https://your-app.onrender.com/api`);
    console.log(`🖼️  Images URL: https://your-app.onrender.com/images/lenovo.jpeg`);
    console.log(`\n✅ Test User: test@example.com / 123456`);
    console.log(`✨ Ready to accept requests!\n`);
});