const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());


let users = [];

// GET all users
app.get("/", (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST new user
app.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Name and email are required" });

  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const user = { id, name, email };
  users.push(user);
  res.status(201).json(user);
});

// PUT (update) user
app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE user
app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

module.exports.handler = serverless(app);