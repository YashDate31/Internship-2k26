const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

//    1. DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
    port: 3307
}).promise();



// CREATE: Add a new product
app.post('/products', async (req, res) => {
    try {
        const { productName, price, quantity } = req.body;
        const insertSql = 'INSERT INTO products (productName, price, quantity) VALUES (?, ?, ?)';
        const [result] = await db.query(insertSql, [productName, price, quantity]);
        
        res.status(201).json({ 
            message: "Product created successfully", 
        });  
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

// READ: Get all products
app.get('/products', async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const [products] = await db.query(sql);
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

// READ: Get a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM products WHERE productID = ?';
        const [product] = await db.query(sql, [id]);
        
        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
});

//update product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, quantity } = req.body;
        
        const updateSql = 'UPDATE products SET productName = ?, price = ?, quantity = ? WHERE productID = ?';
        const [result] = await db.query(updateSql, [productName, price, quantity, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }
        
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

// DELETE: Remove a product by ID

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSql = 'DELETE FROM products WHERE productID = ?';
        const [result] = await db.query(deleteSql, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

// producgt more than quatity 3
app.get('/productss', async (req, res) => {
    try {
        const sql = 'SELECT * FROM products WHERE quantity > 3';
        const [products] = await db.query(sql);
        
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found with quantity > 3" });
        }
        
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

app.listen(4000, () => {
    console.log('CRUD API Server is running on port 3000');
});