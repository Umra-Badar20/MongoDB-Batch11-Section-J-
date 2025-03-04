import express from "express";
import schema from "./schema/index.mjs";
import mongoose from "./db/index.mjs";
import User from "./models/user/index.mjs";

mongoose.connection.on("open", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", () => {
  console.log("Error in connecting MongoDB");
});
const app = express();

const port = 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// let users = [];
app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({ status: 201, user });
  } catch (err) {
    res.status(400).send({ error: err, status: 400 });
  }
});
app.get("/user", async (req, res) => {
  try {
    const users = await User.findById("67c6cfe0f57068bda626f82f");
    res.send(users);
  } catch (err) {
    res.status(400).send({ error: err, status: 400 });
  }
});
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  // const index = users.filter((user)=> user.id !== id)
  const index = users.findIndex((user) => user.id == id);
  users.splice(index, 1);
  res.send({ message: "User deleted successfully" });
});
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id == id);
  users.splice(index, 1, { ...req.body, id });
  res.send({ message: "User updated successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
