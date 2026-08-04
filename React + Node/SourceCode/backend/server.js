const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const transporter = require("./mailer");

const app = express();
app.use(cors());
app.use(express.json());

// Show uploaded images
app.use("/uploads", express.static("uploads"));

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "productdb",
  port: 3307
});

db.connect((err) => {
  if (err)
    console.log(err);
  else
    console.log("Database Connected");
});

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

//register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log("BACKEND: Received this data from ->", req.body);

  db.query(
    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
    [name, email, password],
    (err) => {
      if (err)
        return res.json(err);
      res.send("Registered Successfully");
    });
});

//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    async (err, result) => {
      if (err)
        return res.json(err);

      if (result.length > 0) {
        const user = result[0];

        res.json({
          status: true,
          id: user.id,
          name: user.name
        });

        // Attempt to send login notification email
        try {
          await transporter.sendMail({
            from: process.env.MAIL_FROM || '"Your Name" <Your Gmail Id>',
            to: user.email,
            subject: "Login Alert",
            html: `
                    <h2>Hello ${user.name}</h2>

                    <p>You have successfully logged in.</p>

                    <p>Date : ${new Date().toLocaleString()}</p>
                    <img src ="C:\Users\Yash\OneDrive\Desktop\Internship 2026\React + Node\SourceCode\backend\images.jpg" alt="Login Image" width="300" height="200">

                    <p>If this wasn't you, please change your password immediately.</p>
                `
          });
        } catch (mailErr) {
          console.error('Failed to send login email:', mailErr && mailErr.message ? mailErr.message : mailErr);
        }
      } else {
        res.json({
          status: false
        });
      }
    });
});

//add productt
app.post("/addproduct", upload.single("image"), (req, res) => {
  const { name, price, category, user_id } = req.body;
  if (!req.file) {
    return res.status(400).send("Please upload an image!");
  }
  const image = req.file.filename;

  db.query(
    "INSERT INTO products(name,price,category,image,user_id) VALUES(?,?,?,?,?)",
    [name, price, category, image, user_id],
    (err) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send(err.sqlMessage || "Database Error occurred.");
      }
      res.send("Product Added Successfully");
    });
});

app.post("/bulk-upload", (req, res) => {
  const products = req.body.products;
  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products found to upload!" });
  }

  // avoid duplicatess
  const userIds = [...new Set(products.map(p => p.user_id).filter(Boolean))];
  if (userIds.length === 0) {
    userIds.push(-1);
  }

  // Fetch existing products for these users to filter out duplicates
  db.query(
    "SELECT name, user_id FROM products WHERE user_id IN (?)",
    [userIds],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const existingProducts = new Set(result.map(row => `${row.user_id}-${row.name}`));

      const uniqueProducts = [];
      const seenInRequest = new Set();

      for (const product of products) {
        const key = `${product.user_id}-${product.name}`;
        if (!existingProducts.has(key) && !seenInRequest.has(key)) {
          uniqueProducts.push(product);
          seenInRequest.add(key);
        }
      }

      if (uniqueProducts.length === 0) {
        return res.json({ message: "All products are duplicates and were skipped!" });
      }

      const values = uniqueProducts.map(product => [
        product.name,
        product.price,
        product.category,
        product.image,
        product.user_id
      ]);

      console.log("4. BACKEND: Mapped values for SQL (Unique only) => ", values);

      const sql = `
        INSERT INTO products(name, price, category, image, user_id)
        VALUES ?
      `;

      db.query(sql, [values], (insertErr, insertResult) => {
        if (insertErr) {
          return res.status(500).json(insertErr);
        }

        const duplicateCount = products.length - uniqueProducts.length;
        res.json({
          message: `${uniqueProducts.length} new products uploaded successfully.` +
            (duplicateCount > 0 ? ` ${duplicateCount} duplicates skipped.` : "")
        });
      });
    }
  );
});


//view products
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  // 1. Get search terms
  const searchName = req.query.name || "";
  const searchCategory = req.query.category || "";
  console.log("BACKEND - Received query params:", req.query);

  const nameFilter = `%${searchName}%`;
  const categoryFilter = `%${searchCategory}%`;


  // 3
  const countQuery = "SELECT COUNT(*) AS total FROM products WHERE user_id=? AND name LIKE ? AND category LIKE ?";
  const sql = "SELECT * FROM products WHERE user_id=? AND name LIKE ? AND category LIKE ? LIMIT ? OFFSET ?";

  db.query(countQuery, [id, nameFilter, categoryFilter], (err, countResult) => {
    if (err) return res.send(err);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(sql, [id, nameFilter, categoryFilter, limit, offset], (err, result) => {
      if (err) return res.send(err);

      res.json({
        data: result,
        total,
        page,
        limit,
        totalPages
      });
    });
  });
});
//get all products
app.get("/products", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const countQuery = "SELECT COUNT(*) AS total FROM products";

  db.query(countQuery, (err, countResult) => {
    if (err) return res.send(err);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const sql = "SELECT * FROM products LIMIT ? OFFSET ?";

    db.query(sql, [limit, offset], (err, result) => {
      if (err) return res.send(err);

      res.json({
        data: result,
        total,
        page,
        limit,
        totalPages
      });
    });
  });
});

//get all users with pagination
app.get("/users", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  const countQuery = "SELECT COUNT(*) AS total FROM users";

  db.query(countQuery, (err, countResult) => {
    if (err) return res.send(err);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const sql = "SELECT * FROM users LIMIT ? OFFSET ?";

    db.query(sql, [limit, offset], (err, result) => {
      if (err) return res.send(err);

      const safeResult = result.map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });

      res.json({
        data: safeResult,
        total,
        page,
        limit,
        totalPages
      });
    });
  });
});

app.delete("/deleteproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const sql = "DELETE FROM products WHERE id=?";
    const [result] = await db.promise().query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.json({
      message: "Product deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Get a single product by ID for editing
app.get("/products/single/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(result[0]);
  });
});

// Edit product
app.put("/editproduct/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  
  if (req.file) {
    const image = req.file.filename;
    db.query(
      "UPDATE products SET name=?, price=?, category=?, image=? WHERE id=?",
      [name, price, category, image, id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product updated successfully with new image" });
      }
    );
  } else {
    db.query(
      "UPDATE products SET name=?, price=?, category=? WHERE id=?",
      [name, price, category, id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product updated successfully" });
      }
    );
  }
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
