const express = require("express");
const mysql = require("mysql2"); 
const app = express();
app.use(express.json());

/* Database connection */
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
    port:3307
}).promise();

console.log("Database connected successfully");

/* Insert user */
app.post("/users", async (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO stud (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    try {
        await db.query(sql, values);
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

/* Get all users */
app.get("/users", async (req, res) => {
    try {
        const sql = "SELECT * FROM stud";
        const [users] = await db.query(sql);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

/* Get user by id */
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM stud WHERE id = ?";
        const [user] = await db.query(sql, [id]);

        if (user.length === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(user[0]);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

/* Update user by id */
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const sql = "UPDATE stud SET name = ?, email = ?, password = ? WHERE id = ?";
        const [result] = await db.query(sql, [name, email, password, id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "User updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    } 
});

/* Delete user by id */
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM stud WHERE id = ?";
        const [result] = await db.query(sql, [id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "User deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

/* Start the server */
app.listen(4000, () => {
    console.log("Server is running on port 3000");
});