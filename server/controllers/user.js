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
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "user was created", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    await connectMongoDB();
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "user does not exist" });
    }
    if (await bcrypt.compare(password, existingUser.password)) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ message: "user was found", sessionToken: token });
    } else {
      return res.status(400).json({ error: "password is wrong" });
    }
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

export const getUserData = async (req, res) => {
  try {
    await connectMongoDB();
    return res
      .status(200)
      .json({ message: "userData was send", userData: req.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
