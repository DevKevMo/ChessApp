import { connectMongoDB } from "../db/conn.mjs";
import Todo from "../models/todo.js";

export const create = async (req, res) => {
  try {
    await connectMongoDB();
    const { title, text } = req.body;
    const userid = req.user.id;
    const existingTodo = await Todo.findOne({ title: title, userId: userid });
    if (existingTodo) {
      return res.status(400).json({
        message: "you already have a todo with that title",
      });
    }
    const result = await Todo.create({
      title: title,
      text: text,
      userId: userid,
    });
    res.status(201).json({
      message: "todo was created",
      todo: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {};

export const update = async (req, res) => {};

export const fetchData = async (req, res) => {
  try {
    await connectMongoDB();
    const todo = await Todo.find({ userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "no todos found" });
    }
    res.status(200).json({ message: "data was found", todos: todo });
  } catch (err) {
    res.status(400).json({ error: err });
    console.log(err);
  }
};
