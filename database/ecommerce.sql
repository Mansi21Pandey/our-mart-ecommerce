-- Create Database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255),
    rating DECIMAL(3,1) DEFAULT 4.0,
    description TEXT,
    stock INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Processing',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_address TEXT,
    payment_method VARCHAR(50) DEFAULT 'COD',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Insert Sample Products
INSERT INTO products (name, price, category, image, rating, description) VALUES
('Lenovo Laptop', 86990, 'electronics', 'images/lenovo.jpeg', 4.8, 'High performance laptop'),
('HP Laptop', 75490, 'electronics', 'images/hp.jpeg', 4.5, 'Reliable business laptop'),
('Asus Vivobook', 39956, 'electronics', 'images/asus.jpeg', 4.1, 'Best value laptop'),
('Sony Headphones', 3989, 'electronics', 'images/headphone.jpeg', 4.7, 'Wireless Bluetooth'),
('Sony Bravia TV', 919000, 'electronics', 'images/tv.jpeg', 3.9, '4K Smart TV'),
('Atomberg Fan', 3599, 'electronics', 'images/fan.jpeg', 4.2, 'Energy saving fan'),
('Voltas AC', 46500, 'electronics', 'images/ac.jpeg', 4.5, '1.5 Ton AC'),
('Platform Heels', 4000, 'footwear', 'images/platform.jpeg', 3.6, 'Comfortable heels'),
('Pencil Heels', 3000, 'footwear', 'images/pencil.jpeg', 4.6, 'Stylish pencil heels'),
('Boot Heels', 7000, 'footwear', 'images/boot.jpeg', 3.8, 'Winter boots'),
('Sneakers', 5000, 'footwear', 'images/sneakers.jpeg', 4.2, 'Casual sneakers'),
('Formal Shoes', 4000, 'footwear', 'images/shoes.jpeg', 4.9, 'Office wear'),
('Slippers', 4000, 'footwear', 'images/slippers.jpeg', 4.1, 'Home slippers'),
('Casual Shirt', 800, 'fashion', 'images/shirt.jpeg', 3.2, 'Cotton shirt'),
('T-Shirt', 200, 'fashion', 'images/tshirt.jpeg', 4.0, 'Round neck'),
('Wedding Wear', 5689, 'fashion', 'images/weeding.jpeg', 4.7, 'Traditional outfit'),
('Kurti', 400, 'fashion', 'images/kurti.jpeg', 4.3, 'Cotton kurti'),
('Anarkali Suit', 963, 'fashion', 'images/anarkali.jpeg', 4.6, 'Designer suit'),
('Saree', 700, 'fashion', 'images/saree.jpeg', 4.4, 'Silk saree'),
('Jumpsuit', 1500, 'fashion', 'images/jumpsuit.jpeg', 3.6, 'One piece'),
('Cap', 1500, 'fashion', 'images/cap.jpeg', 3.8, 'Summer cap'),
('Mixer Grinder', 4000, 'home', 'images/mixer.jpeg', 4.6, 'Kitchen appliance'),
('Pressure Cooker', 3500, 'home', 'images/cooker.jpeg', 4.8, '5L cooker'),
('Cutlery Set', 4800, 'home', 'images/cutlery.jpeg', 4.0, 'Stainless steel'),
('Face Cream', 500, 'beauty', 'images/mcream.jpeg', 4.8, 'Moisturizing cream'),
('Face Wash', 300, 'beauty', 'images/facewash.jpeg', 4.5, 'Gentle cleanser'),
('Shampoo', 800, 'beauty', 'images/shampoo.jpeg', 4.3, 'Hair care'),
('Eye Shadow', 500, 'beauty', 'images/eye.jpeg', 4.0, 'Makeup palette'),
('School Bag', 2000, 'bags', 'images/school.jpeg', 4.0, 'Student backpack'),
('Purse', 2000, 'bags', 'images/purse.jpeg', 4.8, 'Women purse'),
('Wallet', 1000, 'bags', 'images/wallet.jpeg', 4.0, 'Leather wallet');