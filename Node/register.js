const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

/* Database connection */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
    port: 3307
}).promise();

/* Register API */
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if email already exists
        const checkSql = 'SELECT * FROM user WHERE email = ?';
        const [existingUser] = await db.query(checkSql, [email]);
        console.log(existingUser);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        } 

        // Insert new user 
        const insertSql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
        await db.query(insertSql, [name, email, password]);
        
        res.status(201).json({ message: "User registered successfully" });  
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

/* Login API */
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
        const [user] = await db.query(sql, [email, password]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({ message: "Login successful", user: user[0] });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

/* Start the server */
app.listen(4000, () => {
    console.log('Server is running on port 4000 ');
}); 