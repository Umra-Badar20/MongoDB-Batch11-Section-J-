import bcrypt from "bcrypt"
import User from "../models/user/index.mjs";

 const login = async (req, res) => {
    try {
      const { email,password } = req.body
      const user= await User.findOne({email})
      if(user){
       const checkPassword= bcrypt.compareSync(password, user.password);
       if(checkPassword){
        res.status(200).send({status:200, message:"Login Successfull", user})
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
      res.status(201).send({ status: 201, user });
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