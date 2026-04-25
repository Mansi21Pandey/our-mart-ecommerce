// ============ API CONFIGURATION - WORKS EVERYWHERE ============
// Automatically detects if running locally or on Render
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ?
    'http://localhost:5000/api' // ← Your local backend port
    :
    '/api'; // Render deployment

console.log('API_URL:', API_URL); // This will help debug
// ============ RAZORPAY CONFIGURATION ============
const RAZORPAY_KEY_ID = 'rzp_test_Shfk0TlKjvRTtI';

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
    { id: 12, name: "Formal Shoes", price: 4000, category: "footwear", image: "/images/shoes.jpeg", rating: 4.9 },
    { id: 13, name: "Slippers", price: 4000, category: "footwear", image: "/images/slippers.jpeg", rating: 4.1 },
    { id: 14, name: "Casual Shirt", price: 800, category: "fashion", image: "/images/shirt.jpeg", rating: 3.2 },
    { id: 15, name: "T-Shirt", price: 200, category: "fashion", image: "/images/tshirt.jpeg", rating: 4.0 },
    { id: 16, name: "Wedding Wear", price: 5689, category: "fashion", image: "/images/weeding.jpeg", rating: 4.7 },
    { id: 17, name: "Kurti", price: 400, category: "fashion", image: "/images/kurti.jpeg", rating: 4.3 },
    { id: 18, name: "Anarkali Suit", price: 963, category: "fashion", image: "/images/anarkali.jpeg", rating: 4.6 },
    { id: 19, name: "Silk Saree", price: 700, category: "fashion", image: "/images/saree.jpeg", rating: 4.4 },
    { id: 20, name: "Jumpsuit", price: 1500, category: "fashion", image: "/images/jumpsuit.jpeg", rating: 3.6 },
    { id: 21, name: "Cap", price: 1500, category: "fashion", image: "/images/cap.jpeg", rating: 3.8 },
    { id: 22, name: "Face Cream", price: 500, category: "beauty", image: "/images/mcream.jpeg", rating: 4.8 },
    { id: 23, name: "Face Wash", price: 300, category: "beauty", image: "/images/facewash.jpeg", rating: 4.5 },
    { id: 24, name: "Shampoo", price: 800, category: "beauty", image: "/images/shampoo.jpeg", rating: 4.3 },
    { id: 25, name: "Eye Shadow", price: 500, category: "beauty", image: "/images/eye.jpeg", rating: 4.0 },
    { id: 26, name: "School Bag", price: 2000, category: "bags", image: "/images/school.jpeg", rating: 4.0 },
    { id: 27, name: "Ladies Purse", price: 2000, category: "bags", image: "/images/purse.jpeg", rating: 4.8 },
    { id: 28, name: "Wallet", price: 1000, category: "bags", image: "/images/wallet.jpeg", rating: 4.0 }
];

// ============ API HELPER FUNCTION ==========
async function apiCall(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    return await response.json();
}

// ============ DELIVERY DATE FUNCTION ==========
function calculateDeliveryDate() {
    const today = new Date();
    let deliveryDate = new Date(today);
    const daysToAdd = Math.floor(Math.random() * 5) + 3;
    deliveryDate.setDate(today.getDate() + daysToAdd);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString('en-IN', options);
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);
    const minFormatted = minDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const maxFormatted = maxDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    return {
        exactDate: formattedDate,
        range: `${minFormatted} - ${maxFormatted}`,
        daysToAdd: daysToAdd
    };
}

function updateDeliveryInfo() {
    const deliveryInfo = calculateDeliveryDate();
    const deliveryInfoDiv = document.getElementById('deliveryInfoPreview');
    if (deliveryInfoDiv) {
        deliveryInfoDiv.innerHTML = `
            <div class="delivery-info">
                <i class="fas fa-truck"></i>
                <span>Estimated Delivery: <span class="delivery-date">${deliveryInfo.range}</span></span>
                <span class="delivery-badge">Free Shipping</span>
                <div style="font-size: 0.8rem; margin-top: 0.3rem; color: #555;">
                    <i class="fas fa-calendar-alt"></i> Expected by ${deliveryInfo.exactDate}
                </div>
            </div>
        `;
    }
}

// ============ AUTHENTICATION ==========
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await apiCall('/auth/login', 'POST', { email, password });

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            currentUser = data.user;
            updateAuthUI();
            toggleAuthModal();
            showNotification(`Welcome back ${data.user.name}!`);
            await loadCartItems();
            await loadOrders();
        } else {
            showNotification(data.message || "Invalid email or password!", "error");
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification("Login failed! Server error.", "error");
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (password !== confirm) {
        showNotification("Passwords do not match!", "error");
        return;
    }

    try {
        console.log('Sending signup request to:', `${API_URL}/auth/signup`);
        const data = await apiCall('/auth/signup', 'POST', { name, email, password });

        console.log('Signup response:', data);

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            currentUser = data.user;
            updateAuthUI();
            toggleAuthModal();
            showNotification("Account created successfully!");
            await loadCartItems();
            await loadOrders();
        } else {
            showNotification(data.message || "Signup failed!", "error");
        }
    } catch (error) {
        console.error('Signup error:', error);
        showNotification("Signup failed! Server error. Check console.", "error");
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    document.getElementById('cartItems').innerHTML = '';
    document.getElementById('cartTotal').innerText = '₹0';
    document.getElementById('cart-count').innerText = '0';
    document.getElementById('ordersContainer').innerHTML = '<p style="text-align:center;">Please login to view your orders</p>';
    showNotification("Logged out successfully!");
}

function updateAuthUI() {
    const userIcon = document.getElementById('userIcon');
    if (currentUser) {
        userIcon.innerHTML = `
            <div class="user-menu">
                <i class="fas fa-user-circle"></i>
                <span style="font-size:0.8rem;">${currentUser.name.split(' ')[0]}</span>
                <div class="dropdown-menu">
                    <a onclick="showSection('orders'); return false;">My Orders</a>
                    <a onclick="logout(); return false;">Logout</a>
                </div>
            </div>
        `;
    } else {
        userIcon.innerHTML = '<i class="fas fa-user"></i>';
    }
}

function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.toggle('show');
}

function switchTab(tab) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('signupForm').classList.add('active');
    }
}

// ============ CART FUNCTIONS ==========
async function addToCart(productId) {
    if (!currentUser) {
        showNotification("Please login first!", "error");
        toggleAuthModal();
        return;
    }

    try {
        const data = await apiCall('/cart/add', 'POST', { productId, quantity: 1 });
        if (data.success) {
            const product = products.find(p => p.id === productId);
            showNotification(`${product.name} added to cart!`);
            await loadCartItems();
        } else {
            showNotification(data.message || "Failed to add to cart!", "error");
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        showNotification("Error adding to cart!", "error");
    }
}

async function removeFromCart(productId) {
    if (!currentUser) return;

    try {
        const data = await apiCall(`/cart/${productId}`, 'DELETE');
        if (data.success) {
            showNotification("Item removed from cart");
            await loadCartItems();
        }
    } catch (error) {
        console.error('Remove from cart error:', error);
        showNotification("Error removing from cart!", "error");
    }
}

function updateCartCount() {
    // Updated in loadCartItems
}

async function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) sidebar.classList.toggle('open');
    await loadCartItems();
}

async function loadCartItems() {
    const container = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    if (!container) return;

    if (!currentUser) {
        container.innerHTML = '<p style="text-align:center;">Login to see cart</p>';
        if (totalSpan) totalSpan.innerText = '₹0';
        document.getElementById('cart-count').innerText = '0';
        return;
    }

    try {
        const data = await apiCall('/cart', 'GET');
        const cart = data.cart || [];

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center;">Your cart is empty</p>';
            if (totalSpan) totalSpan.innerText = '₹0';
            document.getElementById('cart-count').innerText = '0';
            return;
        }

        let total = 0;
        container.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">₹${item.price} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            `;
        }).join('');
        if (totalSpan) totalSpan.innerText = `₹${total.toFixed(2)}`;
        document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    } catch (error) {
        console.error('Load cart error:', error);
    }
}

// ============ CHECKOUT & PAYMENT ==========
let pendingAddress = null;
let pendingDeliveryInfo = null;
let currentCartItems = [];

async function proceedToCheckout() {
    if (!currentUser) {
        showNotification("Please login to checkout!", "error");
        toggleAuthModal();
        return;
    }

    const data = await apiCall('/cart', 'GET');
    currentCartItems = data.cart || [];

    if (currentCartItems.length === 0) {
        showNotification("Your cart is empty!", "error");
        return;
    }
    updateOrderSummaryPreview();
    updateDeliveryInfo();
    const addressModal = document.getElementById('addressModal');
    if (addressModal) addressModal.classList.add('show');
}

function updateOrderSummaryPreview() {
    let total = currentCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const summaryDiv = document.getElementById('orderSummaryPreview');
    if (summaryDiv) {
        summaryDiv.innerHTML = `
            <div style="background:#f0f0f0;padding:10px;border-radius:8px;">
                <strong>Order Summary</strong><br>
                ${currentCartItems.map(item => `${item.name} x${item.quantity}: ₹${(item.price * item.quantity).toFixed(2)}`).join('<br>')}
                <hr>
                <strong>Total: ₹${total.toFixed(2)}</strong>
            </div>
        `;
    }
}

function closeAddressModal() {
    const modal = document.getElementById('addressModal');
    if (modal) modal.classList.remove('show');
    const form = document.getElementById('addressForm');
    if (form) form.reset();
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.classList.remove('show');
}

const addressForm = document.getElementById('addressForm');
if (addressForm) {
    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const address = {
            fullName: document.getElementById('fullName').value,
            mobile: document.getElementById('mobileNumber').value,
            line1: document.getElementById('addressLine1').value,
            line2: document.getElementById('addressLine2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            country: document.getElementById('country').value
        };
        if (!address.fullName || !address.mobile || !address.line1 || !address.city || !address.state || !address.pincode) {
            showNotification("Please fill all required fields!", "error");
            return;
        }
        pendingAddress = address;
        pendingDeliveryInfo = calculateDeliveryDate();
        closeAddressModal();
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) paymentModal.classList.add('show');
    });
}

async function placeOrder(paymentMethod, transactionId = null) {
    const totalAmount = currentCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderData = {
        items: currentCartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        total: totalAmount,
        address: pendingAddress
    };
    
    try {
        const data = await apiCall('/orders/create', 'POST', orderData);
        if (data.success) {
            showNotification(`Order placed successfully! Estimated delivery: ${pendingDeliveryInfo.range}`);
            await loadCartItems();
            await loadOrders();
            pendingAddress = null;
            pendingDeliveryInfo = null;
            closePaymentModal();
            showSection('orders');
        } else {
            showNotification(data.message || "Order failed!", "error");
        }
    } catch (error) {
        console.error('Place order error:', error);
        showNotification("Error placing order!", "error");
    }
}

const payOnlineBtn = document.getElementById('payOnlineBtn');
if (payOnlineBtn) {
    payOnlineBtn.onclick = () => {
        initiateRazorpayPayment();
    };
}

const payCodBtn = document.getElementById('payCodBtn');
if (payCodBtn) {
    payCodBtn.onclick = () => {
        placeOrder('Cash on Delivery');
    };
}

// ============ PRODUCTS & CATEGORIES FUNCTIONS ==========
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" class="product-image" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">⭐ ${product.rating}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    let productsToShow = searchTerm === '' ? products : products.filter(p => p.name.toLowerCase().includes(searchTerm));
    
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:2rem;">No products found</p>';
        return;
    }
    
    productsToShow.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" class="product-image" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">₹${p.price.toLocaleString()}</div>
                <div class="product-rating">⭐ ${p.rating}</div>
                <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterByCategory(category) {
    const filteredProducts = products.filter(p => p.category === category);
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align:center; padding:2rem;">No products found in this category</p>';
        return;
    }
    
    filteredProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" class="product-image" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">₹${p.price.toLocaleString()}</div>
                <div class="product-rating">⭐ ${p.rating}</div>
                <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    showSection('products');
}

function loadCategories() {
    const categories = ['electronics', 'fashion', 'footwear', 'beauty', 'bags'];
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    
    const categoryNames = {
        electronics: 'Electronics',
        fashion: 'Fashion',
        footwear: 'Footwear',
        beauty: 'Beauty',
        bags: 'Bags'
    };
    
    const categoryColors = {
        electronics: '#007bff',
        fashion: '#dc3545',
        footwear: '#fd7e14',
        beauty: '#e83e8c',
        bags: '#6f42c1'
    };
    
    grid.innerHTML = '';
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `<i class="fas ${getIconClass(cat)}" style="color: ${categoryColors[cat]}; font-size: 2.5rem;"></i><h3>${categoryNames[cat]}</h3>`;
        card.onclick = () => filterByCategory(cat);
        grid.appendChild(card);
    });
}

function getIconClass(category) {
    const icons = {
        electronics: 'fa-microchip',
        fashion: 'fa-tshirt',
        footwear: 'fa-shoe-prints',
        beauty: 'fa-smile',
        bags: 'fa-briefcase'
    };
    return icons[category];
}

// ============ ORDERS ==========
async function loadOrders() {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    
    if (!currentUser) {
        container.innerHTML = '<p style="text-align:center;">Please login to view your orders</p>';
        return;
    }
    
    try {
        const data = await apiCall('/orders', 'GET');
        const orders = data.orders || [];
        
        if (orders.length === 0) {
            container.innerHTML = '<p style="text-align:center;">No orders yet</p>';
            return;
        }
        
        container.innerHTML = orders.map(order => {
            let statusClass = 'processing';
            if (order.status === 'Confirmed') statusClass = 'confirmed';
            else if (order.status === 'Shipped') statusClass = 'shipped';
            else if (order.status === 'Delivered') statusClass = 'delivered';
            
            return `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">${order.id}</span>
                        <span class="order-status ${statusClass}">${order.status}</span>
                    </div>
                    <div class="order-items">
                        <strong>Items:</strong>
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span>${item.name} x${item.quantity}</span>
                                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-address">
                        <strong>Delivery Address:</strong><br>
                        ${order.address.fullName}<br>
                        ${order.address.line1}<br>
                        ${order.address.city}, ${order.address.state} - ${order.address.pincode}<br>
                        Mobile: ${order.address.mobile}
                    </div>
                    <div class="estimated-delivery">
                        <i class="fas fa-truck"></i>
                        <strong>Estimated Delivery:</strong> ${order.estimatedDelivery}
                    </div>
                    <div class="order-total">
                        Total: ₹${order.total.toFixed(2)}
                    </div>
                    <div style="margin-top: 0.5rem; color: #999; font-size: 0.8rem;">
                        Ordered on: ${order.date} | Payment: ${order.paymentMethod || 'COD'}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Load orders error:', error);
        container.innerHTML = '<p style="text-align:center;">Error loading orders</p>';
    }
}

// ============ CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification("Message sent successfully! We'll reply soon.");
        e.target.reset();
    });
}

// ============ NAVIGATION ==========
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    if (sectionId === 'orders') {
        loadOrders();
    }
    if (sectionId === 'products') {
        loadProducts();
    }
}

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ============ NOTIFICATION ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============ RAZORPAY PAYMENT FUNCTION ============
async function initiateRazorpayPayment() {
    console.log("🔵 initiateRazorpayPayment CALLED");
    
    const totalAmount = currentCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log("🔵 Total amount:", totalAmount);
    
    if (totalAmount <= 0) {
        showNotification("Cart is empty!", "error");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_URL}/create-razorpay-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount: totalAmount })
        });
        
        const orderData = await response.json();
        
        if (!orderData.success) {
            showNotification("Failed to create order", "error");
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.order_id,
                name: "Our Mart",
                description: "Payment for your order",
                handler: async function(response) {
                    const verifyResponse = await fetch(`${API_URL}/verify-razorpay-payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            order_id: response.razorpay_order_id,
                            payment_id: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                            items: currentCartItems.map(item => ({ 
                                id: item.id, 
                                name: item.name, 
                                quantity: item.quantity, 
                                price: item.price 
                            })),
                            total: totalAmount,
                            address: pendingAddress
                        })
                    });
                    
                    const result = await verifyResponse.json();
                    
                    if (result.success) {
                        showNotification("Payment successful! Order placed.");
                        await loadCartItems();
                        await loadOrders();
                        pendingAddress = null;
                        closePaymentModal();
                        showSection('orders');
                    } else {
                        showNotification("Payment verification failed!", "error");
                    }
                },
                prefill: {
                    name: currentUser?.name || "",
                    email: currentUser?.email || "",
                    contact: pendingAddress?.mobile || ""
                },
                theme: {
                    color: "#007bff"
                }
            };
            
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        };
        script.onerror = () => {
            showNotification("Failed to load payment gateway", "error");
        };
        document.body.appendChild(script);
        
    } catch (error) {
        console.error('Razorpay error:', error);
        showNotification("Payment failed! Please try again.", "error");
    }
}

// ============ EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
    console.log("API_URL:", API_URL);
    loadCategories();
    loadProducts();
    loadCartItems();
    loadOrders();
    updateAuthUI();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
});

// Make functions global for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.proceedToCheckout = proceedToCheckout;
window.closeAddressModal = closeAddressModal;
window.closePaymentModal = closePaymentModal;
window.showSection = showSection;
window.toggleMenu = toggleMenu;
window.switchTab = switchTab;
window.toggleAuthModal = toggleAuthModal;
window.filterProducts = filterProducts;
window.filterByCategory = filterByCategory;
window.logout = logout;