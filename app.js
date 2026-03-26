const express = require("express");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json()); // middleware

app.use("/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});