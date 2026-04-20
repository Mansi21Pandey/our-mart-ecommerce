// ============================================
// BACKEND API CONFIGURATION
// ============================================
// ============================================
// AUTO-DETECT LOCAL VS PRODUCTION
// ============================================
const isLocal = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

// Use different URLs based on environment
// CHANGE THIS URL AFTER DEPLOYMENT (I'll show you how)
const PRODUCTION_URL = 'https://your-app-name.onrender.com'; // Update this later!

const API_URL = isLocal ?
    'http://localhost:5000/api' :
    `${PRODUCTION_URL}/api`;

const IMAGE_BASE_URL = isLocal ?
    'http://localhost:5000' :
    PRODUCTION_URL;




let authToken = localStorage.getItem('authToken') || null;

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// ============================================
// ORIGINAL CODE - DO NOT MODIFY BELOW
// ============================================

// Sample Products Data
const products = [{
        id: 1,
        name: "Lenovo Laptop",
        price: 86990,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/lenovo.jpeg",
        rating: 4.8,
    },
    {
        id: 2,
        name: "Hp laptop",
        price: 75490,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/hp.jpeg",
        rating: 4.5,
    },
    {
        id: 3,
        name: "Asus vivo book Laptop",
        price: 39956,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/asus.jpeg",
        rating: 4.1,
    },
    {
        id: 4,
        name: "HeadphoneSony Wireless Bluetooth Headphones",
        price: 3989,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/headphone.jpeg",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Sony Bravia 3 TV",
        price: 919000,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/tv.jpeg",
        rating: 3.9,
    },
    {
        id: 6,
        name: "Atomberg Fan",
        price: 3599,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/fan.jpeg",
        rating: 4.2,
    },
    {
        id: 7,
        name: "Voltas AC",
        price: 46500,
        category: "electronics",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/ac.jpeg",
        rating: 4.5,
    },
    {
        id: 8,
        name: "Platform Heels",
        price: 4000,
        category: "footwear",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/platform.jpeg",
        rating: 3.6,
    },
    {
        id: 9,
        name: "Pencil Heels",
        price: 3000,
        category: "footwear",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/pencil.jpeg",
        rating: 4.6,
    },
    {
        id: 10,
        name: "Boot Heels",
        price: 7000,
        category: "footwear",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/boot.jpeg",
        rating: 3.8,
    },
    {
        id: 11,
        name: "Sneakers",
        price: 5000,
        category: "footwear",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/sneakers.jpeg",
        rating: 4.2,
    },
    {
        id: 12,
        name: "Shoes",
        price: 4000,
        category: "footwear",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/shoes.jpeg",
        rating: 4.9,
    },
    {
        id: 13,
        name: "Slippers",
        price: 4000,
        category: "footwear",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/slippers.jpeg",
        rating: 4.1,
    },
    {
        id: 14,
        name: "Shirt",
        price: 800,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/shirt.jpeg",
        rating: 3.2,
    },
    {
        id: 15,
        name: "T-Shirt",
        price: 200,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/tshirt.jpeg",
        rating: 4.0,
    },
    {
        id: 16,
        name: "Wedding Wear",
        price: 5689,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/weeding.jpeg",
        rating: 4.7,
    },
    {
        id: 17,
        name: "Kurti",
        price: 400,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/kurti.jpeg",
        rating: 4.3,
    },
    {
        id: 18,
        name: "Anarkali Suit",
        price: 963,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/anarkali.jpeg",
        rating: 4.6,
    },
    {
        id: 19,
        name: "Saree",
        price: 700,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/saree.jpeg",
        rating: 4.4,
    },
    {
        id: 20,
        name: "Jumpsuit",
        price: 1500,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/jumpsuit.jpeg",
        rating: 3.6,
    },
    {
        id: 21,
        name: "Cap",
        price: 1500,
        category: "fashion",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/cap.jpeg",
        rating: 3.8,
    },
    {
        id: 22,
        name: "Mama's Earth Cream",
        price: 500,
        category: "beauty",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/mcream.jpeg",
        rating: 4.8,
    },
    {
        id: 23,
        name: "Face Wash",
        price: 300,
        category: "beauty",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/facewash.jpeg",
        rating: 4.5,
    },
    {
        id: 24,
        name: "Shampoo",
        price: 800,
        category: "beauty",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/shampoo.jpeg",
        rating: 4.3,
    },
    {
        id: 25,
        name: "Eye Shadow",
        price: 500,
        category: "beauty",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/eye.jpeg",
        rating: 4.0,
    },
    {
        id: 26,
        name: "School Bag",
        price: 2000,
        category: "bags",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/school.jpeg",
        rating: 4.0,
    },
    {
        id: 27,
        name: "Purse",
        price: 2000,
        category: "bags",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/purse.jpeg",
        rating: 4.8,
    },
    {
        id: 28,
        name: "Wallet",
        price: 1000,
        category: "bags",
        image: IMAGE_BASE_URL + "http://localhost:5000/images/wallet.jpeg",
        rating: 4.0,
    }
];




// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Orders Management
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Users Management
let users = JSON.parse(localStorage.getItem('users')) || [];

// Current User
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
    loadCartItems();
    loadOrders();
    setupEventListeners();
    updateAuthUI();
});

// Show Products Section and Load All Products
function showProducts() {
    showSection('products');
    loadProducts(); // This should display all products
}

// Update your navigation click handler
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        if (targetId === 'products') {
            showSection('products');
            loadProducts(); // Reload all products
        } else {
            showSection(targetId);
        }

        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});



// Setup Event Listeners
function setupEventListeners() {
    // Address Form Submit
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', placeOrderWithAddress);
    }
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // FIXED: Search input - real-time search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }

    // FIXED: Search icon click - NOW WORKING!
    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            filterProducts();
            showNotification('Searching... 🔍');
        });
    }

    // Auth Forms - Using updated handlers
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.removeEventListener('submit', handleLogin);
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.removeEventListener('submit', handleSignup);
        signupForm.addEventListener('submit', handleSignup);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }

    // Category Cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent.toLowerCase();
            filterByCategory(category);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('authModal');
        if (e.target === modal) {
            toggleAuthModal();
        }
    });
}

// Show Section
function showSection(sectionId) {
    // Update active section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');

    // Load orders if orders section is shown
    if (sectionId === 'orders') {
        loadOrders();
    }
}

// Toggle Menu for Mobile
function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

// SEARCH
function searchFunction() {
    let input = document.getElementById("search-input").value.toLowerCase();
    let items = document.getElementsByClassName("category-card");

    for (let i = 0; i < items.length; i++) {
        let text = items[i].innerText.toLowerCase();

        if (text.includes(input)) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}

// ============================================
// UPDATED HANDLERS WITH BACKEND INTEGRATION
// ============================================

// Handle Login with API
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (data.success) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            currentUser = data.user;

            // Also update users array for compatibility
            const existingUser = users.find(u => u.email === email);
            if (!existingUser) {
                users.push({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    password: password
                });
                localStorage.setItem('users', JSON.stringify(users));
            }

            updateAuthUI();
            toggleAuthModal();
            showNotification('Login successful!');

            // Clear form
            document.getElementById('loginForm').reset();

            // Reload cart and orders from backend
            await loadCartItems();
            await loadOrders();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Handle Signup with API
async function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    try {
        const data = await apiCall('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });

        if (data.success) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            currentUser = data.user;

            // Update users array for compatibility
            users.push({
                id: data.user.id,
                name: name,
                email: email,
                password: password
            });
            localStorage.setItem('users', JSON.stringify(users));

            updateAuthUI();
            toggleAuthModal();
            showNotification('Account created successfully!');

            // Clear form
            document.getElementById('signupForm').reset();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Handle Logout
function logout() {
    currentUser = null;
    authToken = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    // Clear local cart and orders
    cart = [];
    orders = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
    updateAuthUI();
    updateCartCount();
    showNotification('Logged out successfully!');
    loadCartItems();
    loadOrders();
}

// Update Auth UI
function updateAuthUI() {
    const userIcon = document.getElementById('userIcon');

    if (currentUser) {
        userIcon.innerHTML = `
            <div class="user-menu">
                <i class="fas fa-user-circle"></i>
                <span class="user-name">${currentUser.name}</span>
                <div class="dropdown-menu">
                    <a href="#" onclick="showSection('orders'); return false;">My Orders</a>
                    <a href="#" onclick="logout(); return false;">Logout</a>
                </div>
            </div>
        `;
    } else {
        userIcon.innerHTML = '<i class="fas fa-user"></i>';
    }
}

// Switch Auth Tab
function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));

    if (tab === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    }
}

// Toggle Auth Modal
function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('show');
}

// Handle Contact Form
async function handleContact(e) {
    e.preventDefault();

    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;

    try {
        const data = await apiCall('/contact/submit', {
            method: 'POST',
            body: JSON.stringify({ name, email, message })
        });

        if (data.success) {
            showNotification('Message sent successfully!');
            e.target.reset();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Load Products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">₹${product.price.toFixed(2)}</div>
            <div class="product-rating">
                ${generateRatingStars(product.rating)}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Generate Rating Stars
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Filter Products
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
    );

    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Filter by Category
function filterByCategory(category) {
    const filteredProducts = products.filter(product =>
        product.category === category
    );

    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    showSection('products');
}

// Add to Cart with API
async function addToCart(productId) {
    if (!currentUser) {
        showNotification('Please login to add items to cart', 'error');
        toggleAuthModal();
        return;
    }

    const product = products.find(p => p.id === productId);

    try {
        await apiCall('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity: 1 })
        });

        showNotification(`${product.name} added to cart!`);
        await loadCartItems(); // Refresh cart from backend
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.textContent = count;
    }
}

// Load Cart Items from API
async function loadCartItems() {
    if (!currentUser) {
        const cartItems = document.getElementById('cartItems');
        if (cartItems) cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) cartTotal.textContent = '₹0.00';
        cart = [];
        updateCartCount();
        return;
    }

    try {
        const data = await apiCall('/cart');
        if (data.success) {
            // Convert API cart format to match existing format
            cart = data.cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                category: item.category,
                quantity: item.quantity,
                rating: item.rating || 4.0
            }));

            updateCartCount();

            const cartItemsElem = document.getElementById('cartItems');
            const cartTotalElem = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItemsElem.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                cartTotalElem.textContent = '₹0.00';
                return;
            }

            cartItemsElem.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </div>
                `;
                cartItemsElem.appendChild(cartItem);
            });

            cartTotalElem.textContent = `₹${total.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }
}

// Remove from Cart with API
async function removeFromCart(productId) {
    try {
        await apiCall(`/cart/${productId}`, {
            method: 'DELETE'
        });

        await loadCartItems(); // Refresh cart
        showNotification('Item removed from cart');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

// Checkout with API
async function checkout() {
    // Checkout - Show address modal instead of direct order
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    if (!currentUser) {
        showNotification('Please login to checkout', 'error');
        toggleAuthModal();
        return;
    }

    // Show address modal with order summary
    showAddressModal();
}

// Show Address Modal with Order Summary
function showAddressModal() {
    const modal = document.getElementById('addressModal');
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');

    // Populate order summary
    summaryItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${itemTotal.toLocaleString('en-IN')}</span>
        `;
        summaryItems.appendChild(summaryItem);
    });

    summaryTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    modal.classList.add('show');
}

// Close Address Modal
function closeAddressModal() {
    document.getElementById('addressModal').classList.remove('show');
    document.getElementById('addressForm').reset();
}

// Place Order with Address
async function placeOrderWithAddress(e) {
    e.preventDefault();

    // Get address details
    const address = {
        fullName: document.getElementById('fullName').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        addressLine1: document.getElementById('addressLine1').value,
        addressLine2: document.getElementById('addressLine2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        country: document.getElementById('country').value
    };

    // Validate address
    if (!address.fullName || !address.mobileNumber || !address.addressLine1 ||
        !address.city || !address.state || !address.pincode) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(address.mobileNumber)) {
        showNotification('Please enter a valid 10-digit mobile number!', 'error');
        return;
    }

    // Validate pincode
    if (!/^[0-9]{6}$/.test(address.pincode)) {
        showNotification('Please enter a valid 6-digit pincode!', 'error');
        return;
    }

    try {
        // Create order with address
        const orderData = {
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            address: address,
            orderDate: new Date().toISOString()
        };

        const data = await apiCall('/orders/create', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });

        if (data.success) {
            // Update orders array
            orders.unshift(data.order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Clear cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            await loadCartItems();

            // Close modals
            closeAddressModal();
            toggleCart();

            // Show success message with address
            showNotification(`Order placed successfully! Will be delivered to: ${address.addressLine1}, ${address.city}`, 'success');

            // Load updated orders
            await loadOrders();

            // Redirect to orders section
            showSection('orders');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Load Orders from API

// Load Orders from API with address display
async function loadOrders() {
    const ordersContainer = document.getElementById('ordersContainer');

    if (!currentUser) {
        if (ordersContainer) {
            ordersContainer.innerHTML = '<p class="no-orders">Please login to view your orders</p>';
        }
        return;
    }

    try {
        const data = await apiCall('/orders');
        if (data.success && data.orders) {
            orders = data.orders;
            localStorage.setItem('orders', JSON.stringify(orders));

            if (orders.length === 0) {
                ordersContainer.innerHTML = '<p class="no-orders">No orders yet</p>';
                return;
            }

            ordersContainer.innerHTML = '';

            orders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';

                const itemsHtml = order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                `).join('');

                // Display address if exists
                const addressHtml = order.address ? `
                    <div class="order-address">
                        <h4>Delivery Address:</h4>
                        <p>
                            ${order.address.fullName}<br>
                            ${order.address.addressLine1}<br>
                            ${order.address.addressLine2 ? order.address.addressLine2 + '<br>' : ''}
                            ${order.address.city}, ${order.address.state} - ${order.address.pincode}<br>
                            ${order.address.country}<br>
                            <strong>Mobile: ${order.address.mobileNumber}</strong>
                        </p>
                    </div>
                ` : '';

                const estimatedDelivery = order.estimatedDelivery ?
                    `<div class="estimated-delivery"> Expected Delivery: ${order.estimatedDelivery}</div>` : '';

                orderCard.innerHTML = `
                    <div class="order-header">
                        <span class="order-id">${order.id}</span>
                        <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
                    </div>
                    <div class="order-items">
                        <strong>Items:</strong>
                        ${itemsHtml}
                    </div>
                    ${addressHtml}
                    <div class="order-total">
                        Total: ₹${order.total.toLocaleString('en-IN')}
                    </div>
                    <div class="order-date">Ordered on: ${order.date} at ${order.time || ''}</div>
                    ${estimatedDelivery}
                `;

                ordersContainer.appendChild(orderCard);
            });
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        // Fallback to localStorage with address display
        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p class="no-orders">No orders yet</p>';
        } else {
            renderOrdersFromLocal(ordersContainer);
        }
    }
}

function renderOrdersFromLocal(container) {
    container.innerHTML = '';
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        const itemsHtml = order.items.map(item => `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
        `).join('');

        const addressHtml = order.address ? `
            <div class="order-address">
                <h4>Delivery Address:</h4>
                <p>${order.address.fullName}<br>
                ${order.address.addressLine1}<br>
                ${order.address.city}, ${order.address.state} - ${order.address.pincode}<br>
                Mobile: ${order.address.mobileNumber}</p>
            </div>
        ` : '';

        orderCard.innerHTML = `
            <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-status">${order.status}</span>
            </div>
            <div class="order-items">
                <strong>Items:</strong>
                ${itemsHtml}
            </div>
            ${addressHtml}
            <div class="order-total">Total: ₹${order.total.toLocaleString('en-IN')}</div>
            <div class="order-date">Ordered on: ${order.date}</div>
        `;
        container.appendChild(orderCard);
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles to CSS (if not already present)
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 3000;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.error {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%);
        }

        .notification i {
            font-size: 1.2rem;
        }

        .empty-cart, .no-orders {
            text-align: center;
            color: #999;
            padding: 2rem;
            font-size: 1.1rem;
        }

        .user-menu {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }

        .user-name {
            font-size: 0.9rem;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            min-width: 150px;
            z-index: 1000;
        }

        .user-menu:hover .dropdown-menu {
            display: flex;
        }

        .dropdown-menu a {
            padding: 0.75rem 1rem;
            color: #333;
            text-decoration: none;
            transition: background 0.3s;
            cursor: pointer;
        }

        .dropdown-menu a:hover {
            background: #f5f5f5;
        }

        .order-date {
            margin-top: 0.5rem;
            color: #999;
            font-size: 0.9rem;
            text-align: right;
        }
    `;
    document.head.appendChild(style);
}