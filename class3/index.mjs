import express from "express";
import schema from "./schema/index.mjs";
import mongoose from "./db/index.mjs";
import User from "./models/user/index.mjs";
import bcrypt from "bcrypt"

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
app.post("/user/login", async (req, res) => {
  try {
    const { email,password } = req.body
    const user= await User.findOne({email})
    if(user){
     const checkPassword= bcrypt.compareSync(password, user.password);
     if(checkPassword){
      res.status(200).send({status:200, message:"Login Successfull", user})
     }else{
      res.status(401).send({ error: err, status: 401, message: "Incorrect Password" });
     }
    }else{
      res.status(404).send({ error: err, status: 404, message: "User not found" });
    }
  } catch (err) {
    console.log(err); 
    res.status(400).send({ error: err, status: 400});
  }
});
app.post("/user", async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({...req.body, password});
    res.status(201).send({ status: 201, user });
  } catch (err) {
    res.status(400).send({ error: err, status: 400 });
  }
});
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send({ error: err, status: 400 });
  }
});
app.delete("/user/:id", async(req, res) => {
try {
   const { id } = req.params;
   await User.findByIdAndDelete(id)
  res.send({ message: "User deleted successfully" });
}catch(err){
  res.status(400).send({ error: err, status: 400 });

}
});
app.put("/user/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body)
    res.send({ message: "User updated successfully" ,user});
  } catch (err) {
    res.status(400).send({ error: err, status: 400 });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
