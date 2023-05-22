import { Router } from "express";
const recordRoutes = Router();
import { connectMongoDB } from "../db/conn.mjs";
import User from "../models/user.js";



recordRoutes.route("/user").get(async (req, res) => {
  try {
    await connectMongoDB();
    const users = await User.findOne({});
    res.status(200).json({ users: users, message: "Ronaldo moment" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

recordRoutes.route("/user").post(async (req, res) => {
  try {
    await connectMongoDB();
    const { name, email, password } = req.body;
    const users = new User({
      name: name,
      email: email,
      password: password,
    });
    const createdUser = await users.save();
    res.status(200).json({ users: users, message: "Ronaldo moment" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default recordRoutes;
