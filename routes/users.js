const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const filePath = path.join(__dirname, "../data/users.json");

// Read users
const getUsers = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Write users
const saveUsers = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


// ✅ GET /users (with search + sort)
router.get("/", (req, res) => {
  let users = getUsers();
  const { search, sort, order } = req.query;

  if (search) {
    users = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort) {
    users.sort((a, b) => {
      if (order === "desc") {
        return b[sort].localeCompare(a[sort]);
      }
      return a[sort].localeCompare(b[sort]);
    });
  }

  res.json(users);
});


// ✅ GET /users/:id
router.get("/:id", (req, res) => {
  const users = getUsers();
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


// ✅ POST /users
router.post("/", (req, res) => {
  const users = getUsers();
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json(newUser);
});


// ✅ PUT /users/:id
router.put("/:id", (req, res) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  users[index] = {
    ...users[index],
    name: name || users[index].name,
    email: email || users[index].email
  };

  saveUsers(users);

  res.json(users[index]);
});


// ✅ DELETE /users/:id
router.delete("/:id", (req, res) => {
  let users = getUsers();
  const filtered = users.filter(u => u.id !== req.params.id);

  if (filtered.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  saveUsers(filtered);

  res.json({ message: "User deleted successfully" });
});

module.exports = router;