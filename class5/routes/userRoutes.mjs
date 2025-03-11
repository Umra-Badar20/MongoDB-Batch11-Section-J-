import express from "express";
const router = express.Router();
import tokenVerification from "../config/tokenVerification.mjs"
import { createUser, getAllUsers, updateUser, deleteUser, login } from "../controller/userController.mjs";

router.get("/user", tokenVerification, getAllUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/login", login);

export default router;