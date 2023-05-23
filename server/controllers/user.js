import { connectMongoDB } from "../db/conn.mjs";
import User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    await connectMongoDB();
    const { name, email, password } = req.body;
    const users = new User({
      name: name,
      email: email,
      password: password,
    });
    const createdUser = await users.save();
    res.status(200).json({ users: users, message: "test" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
