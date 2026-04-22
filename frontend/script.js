// ========== PRODUCT DATA ==========
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

// Category Icons Mapping
const categoryIcons = {
    electronics: '<i class="fas fa-microchip"></i>',
    fashion: '<i class="fas fa-tshirt"></i>',
    footwear: '<i class="fas fa-shoe-prints"></i>',
    beauty: '<i class="fas fa-smile"></i>',
    bags: '<i class="fas fa-briefcase"></i>'
};

// ========== DELIVERY DATE FUNCTION ==========
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

// ========== LOCAL STORAGE ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function saveData() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateCartCount();
}

// ========== AUTHENTICATION ==========
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        saveData();
        updateAuthUI();
        toggleAuthModal();
        showNotification(`Welcome back ${user.name}!`);
        loadCartItems();
        loadOrders();
    } else {
        showNotification("Invalid email or password!", "error");
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (password !== confirm) {
        showNotification("Passwords do not match!", "error");
        return;
    }
    if (users.find(u => u.email === email)) {
        showNotification("Email already exists!", "error");
        return;
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    currentUser = newUser;
    saveData();
    updateAuthUI();
    toggleAuthModal();
    showNotification("Account created successfully!");
    loadCartItems();
    loadOrders();
}

function logout() {
    currentUser = null;
    cart = [];
    orders = [];
    saveData();
    updateAuthUI();
    loadCartItems();
    loadOrders();
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
    document.getElementById('authModal').classList.toggle('show');
}

function switchTab(tab) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('signupForm').classList.add('active');
    }
}

// ========== CART FUNCTIONS ==========
function addToCart(productId) {
    if (!currentUser) {
        showNotification("Please login first!", "error");
        toggleAuthModal();
        return;
    }
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1 });
    }
    saveData();
    loadCartItems();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveData();
    loadCartItems();
    showNotification("Item removed from cart");
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = total;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    loadCartItems();
}

function loadCartItems() {
    const container = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    if (!currentUser) {
        container.innerHTML = '<p style="text-align:center;">Login to see cart</p>';
        totalSpan.innerText = '₹0';
        return;
    }
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Your cart is empty</p>';
        totalSpan.innerText = '₹0';
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
    totalSpan.innerText = `₹${total.toFixed(2)}`;
}

// ========== CHECKOUT & PAYMENT ==========
let pendingAddress = null;
let pendingDeliveryInfo = null;

function proceedToCheckout() {
    if (!currentUser) {
        showNotification("Please login to checkout!", "error");
        toggleAuthModal();
        return;
    }
    if (cart.length === 0) {
        showNotification("Your cart is empty!", "error");
        return;
    }
    updateOrderSummaryPreview();
    updateDeliveryInfo();
    document.getElementById('addressModal').classList.add('show');
}

function updateOrderSummaryPreview() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('orderSummaryPreview').innerHTML = `
        <div style="background:#f0f0f0;padding:10px;border-radius:8px;">
            <strong>Order Summary</strong><br>
            ${cart.map(item => `${item.name} x${item.quantity}: ₹${(item.price * item.quantity).toFixed(2)}`).join('<br>')}
            <hr>
            <strong>Total: ₹${total.toFixed(2)}</strong>
        </div>
    `;
}

function closeAddressModal() {
    document.getElementById('addressModal').classList.remove('show');
    document.getElementById('addressForm').reset();
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('show');
}

document.getElementById('addressForm').addEventListener('submit', (e) => {
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
    document.getElementById('paymentModal').classList.add('show');
});

function placeOrder(paymentMethod, transactionId = null) {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let orderStatus = 'Confirmed';
    if (paymentMethod === 'cod') {
        orderStatus = 'Processing';
    }
    const newOrder = {
        id: "ORD" + Date.now(),
        items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        total: totalAmount,
        address: pendingAddress,
        status: orderStatus,
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        orderDate: new Date().toLocaleDateString(),
        orderTime: new Date().toLocaleTimeString(),
        deliveryInfo: pendingDeliveryInfo || calculateDeliveryDate()
    };
    orders.unshift(newOrder);
    cart = [];
    saveData();
    loadCartItems();
    loadOrders();
    const deliveryMsg = `Estimated delivery: ${newOrder.deliveryInfo.range}`;
    showNotification(`Order placed successfully! ${deliveryMsg}`);
    pendingAddress = null;
    pendingDeliveryInfo = null;
    closePaymentModal();
    showSection('orders');
}

document.getElementById('payOnlineBtn').onclick = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (confirm(`Proceed to pay ₹${total} via Online Payment?\n(Click OK to simulate successful payment)`)) {
        const dummyTransaction = "TXN_" + Math.random().toString(36).substr(2, 8).toUpperCase();
        placeOrder('Online', dummyTransaction);
    }
};

document.getElementById('payCodBtn').onclick = () => {
    placeOrder('Cash on Delivery');
};

// ========== FIXED PRODUCTS & CATEGORIES FUNCTIONS ==========
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" class="product-image" alt="${product.name}">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    // Pehle decide karo ki kaunse products dikhane hain
    let productsToShow = [];
    
    // Agar search term hai to search karo, warna saare products
    if (searchTerm === '') {
        productsToShow = products;
    } else {
        productsToShow = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    }
    
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:2rem;">No products found</p>';
        return;
    }
    
    for (let i = 0; i < productsToShow.length; i++) {
        const p = productsToShow[i];
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" class="product-image" alt="${p.name}">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">₹${p.price}</div>
                <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    }
}

// FIXED: Category filter function - This will work correctly now
// ========== CATEGORY FILTER FUNCTION ==========
function filterByCategory(category) {
    // Filter products by category
    const filteredProducts = products.filter(p => p.category === category);
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align:center; padding:2rem;">No products found in this category</p>';
        return;
    }
    
    for (let i = 0; i < filteredProducts.length; i++) {
        const p = filteredProducts[i];
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" class="product-image" alt="${p.name}">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">₹${p.price}</div>
                <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(card);
    }
    
    // Search box clear karo taaki conflict na ho
    document.getElementById('search-input').value = '';
    
    // Products section dikhao
    showSection('products');
}

function loadCategories() {
    const categories = ['electronics', 'fashion', 'footwear', 'beauty', 'bags'];
    const grid = document.getElementById('categoryGrid');
    
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
    
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `<i class="fas ${getIconClass(cat)}" style="color: ${categoryColors[cat]}; font-size: 2.5rem;"></i><h3>${categoryNames[cat]}</h3>`;
        card.onclick = function() {
            filterByCategory(cat);
        };
        grid.appendChild(card);
    }


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
// ========== ORDERS WITH DELIVERY DATE ==========
function loadOrders() {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    
    if (!currentUser) {
        container.innerHTML = '<p style="text-align:center;">Please login to view your orders</p>';
        return;
    }
    if (orders.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No orders yet</p>';
        return;
    }
    container.innerHTML = orders.map(order => {
        let statusClass = 'processing';
        if (order.status === 'Confirmed') statusClass = 'confirmed';
        else if (order.status === 'Shipped') statusClass = 'shipped';
        else if (order.status === 'Delivered') statusClass = 'delivered';
        else statusClass = 'processing';
        const deliveryInfo = order.deliveryInfo || calculateDeliveryDate();
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
                    <strong>Estimated Delivery:</strong> ${deliveryInfo.range}
                    <div style="font-size: 0.8rem; margin-top: 0.3rem;">
                        <i class="fas fa-calendar-alt"></i> Expected by ${deliveryInfo.exactDate}
                    </div>
                </div>
                <div class="order-total">
                    Total: ₹${order.total.toFixed(2)}
                </div>
                <div style="margin-top: 0.5rem; color: #999; font-size: 0.8rem;">
                    Ordered on: ${order.orderDate} at ${order.orderTime || ''} | Payment: ${order.paymentMethod}
                </div>
            </div>
        `;
    }).join('');
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification("Message sent successfully! We'll reply soon.");
        e.target.reset();
    });
}

// ========== NAVIGATION ==========
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

// ========== NOTIFICATION ==========
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

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
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