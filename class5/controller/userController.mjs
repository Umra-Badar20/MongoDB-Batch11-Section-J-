import bcrypt from "bcrypt"
import User from "../models/user/index.mjs";
import jwt from "jsonwebtoken"
import 'dotenv/config'
 const login = async (req, res) => {
    try {
      const { email,password } = req.body
      const user= await User.findOne({email})
      if(user){
       const checkPassword= bcrypt.compareSync(password, user.password);
       if(checkPassword){
        var token = jwt.sign({email: user.email}, process.env.JWT_SECRET, { expiresIn: "60s" });
        res.status(200).send({status:200, message:"Login Successfull", user, token})
       }else{
        res.status(401).send({ status: 401, message: "Incorrect Password" });
       }
      }else{
        res.status(404).send({status: 404, message: "User not found" });
      }
    } catch (err) {
      console.log(err); 
      res.status(400).send({ error: err, status: 400});
    }
  };
 const createUser= async (req, res) => {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({...req.body, password});
      var token = jwt.sign({email: user.email}, process.env.JWT_SECRET, { expiresIn: '30s' });

      res.status(201).send({ status: 201, user, token });
    } catch (err) {
      res.status(400).send({ error: err, status: 400 });
    }
  };
 const getAllUsers= async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(400).send({ error: err, status: 400 });
    }
  };
  const deleteUser= async(req, res) => {
  try {
     const { id } = req.params;
     await User.findByIdAndDelete(id)
    res.send({ message: "User deleted successfully" });
  }catch(err){
    res.status(400).send({ error: err, status: 400 });
  
  }
  };
  const updateUser= async(req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body,{new:true});
      res.send({ message: "User updated successfully" ,user});
    } catch (err) {
      res.status(400).send({ error: err, status: 400 });
    }
  };
  export { login, getAllUsers ,createUser , deleteUser , updateUser };