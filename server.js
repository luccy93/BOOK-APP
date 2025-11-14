const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());

// Create database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "library"
});

// GET /books → Retrieve all books
app.get("/books", (req, res) => {
    db.query("SELECT * FROM Book", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST /books → Insert a new book
app.post("/books", (req, res) => {
    const { title, author, price } = req.body;

    const query = "INSERT INTO Book (title, author, price) VALUES (?, ?, ?)";
    db.query(query, [title, author, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Book added successfully" });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
