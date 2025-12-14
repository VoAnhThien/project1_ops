const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(express.json());
const cors = require("cors");

app.use(cors({
  origin: "*", // hoặc cụ thể: ["http://localhost:3000", "https://project1-ops.netlify.app"]
}));
// Kết nối DB SQLite
const db = new sqlite3.Database("./db.sqlite");

// Tạo bảng nếu chưa có
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");

// API: lấy danh sách user
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// API: thêm user
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO users(name) VALUES(?)", [name], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID, name });
  });
});

app.listen(5000, () => console.log("Backend chạy ở http://localhost:5000"));

const path = require("path");

// Phục vụ frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});