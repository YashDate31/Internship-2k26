const express = require('express');
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let db;

(async () => {
    try {
        db = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "revision",
            port: 3307
        });
        console.log("Database Connected");
    } catch (err) {
        console.error("Database connection failed:", err);
    }
})();

app.get("/", (req, res) => {
    res.send("node server is running...");
});

// register
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkSql = "SELECT * FROM users WHERE email = ?";
        const [existingUsers] = await db.query(checkSql, [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        await db.query(insertSql, [name, email, hashedPassword]);

        return res.status(201).json({
            message: "Registration successful"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = "SELECT * FROM users WHERE email = ?";
        const [result] = await db.query(sql, [email]);

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, result[0].password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }
        return res.status(200).json({
            message: "Login successful",
            // user: {
            //     id: result[0].id,
            //     name: result[0].name,
            //     email: result[0].email
            // }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});