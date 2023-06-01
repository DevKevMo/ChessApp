import { connectMongoDB } from "../db/conn.mjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

export const signup = async (req, res) => {
  try {
    await connectMongoDB();
    const { name, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: name,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    await connectMongoDB();
    const { name, email, password } = req.body;
    const users = new User({
      name: name,
      email: email,
      password: password,
    });
    const createdUser = await users.save();
    res.status(200).json({ users: users, message: "user was created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    await connectMongoDB();
    const { name, email, password } = req.body;
    const users = new User({
      name: name,
      email: email,
      password: password,
    });
    const createdUser = await users.save();
    res.status(200).json({ users: users, message: "user was created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    await connectMongoDB();
    const { name, email, password } = req.body;
    const users = new User({
      name: name,
      email: email,
      password: password,
    });
    const createdUser = await users.save();
    res.status(200).json({ users: users, message: "user was created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
