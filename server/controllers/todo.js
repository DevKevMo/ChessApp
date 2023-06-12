import { connectMongoDB } from "../db/conn.mjs";
import Todo from "../models/todo.js";

export const create = async (req, res) => {
  try {
    await connectMongoDB();
    const { title, text, status, expires } = req.body;
    const userid = req.user.id;
    const existingTodo = await Todo.findOne({ title: title, userId: userid });
    if (existingTodo) {
      return res.status(400).json({
        error: "you already have a todo with that title",
      });
    }
    const result = await Todo.create({
      title: title,
      text: text,
      userId: userid,
      status: status,
      expires: expires,
    });
    res.status(201).json({
      message: "todo was created",
      todo: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const check = async (req, res) => {
  try {
    await connectMongoDB();
    const { checked, id } = req.body;
    if (checked) {
      await Todo.updateOne({ _id: id }, { status: "incomplete" });
      res.status(200).json({
        message: "task incompleted",
      });
    } else {
      await Todo.updateOne({ _id: id }, { status: "complete" });
      res.status(200).json({
        message: "task completed",
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await connectMongoDB();
    const { id } = req.body;
    await Todo.deleteOne({ _id: id });
    res.status(201).json({
      message: "todo was removed",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    await connectMongoDB();
    const { title, text, status, id, expires } = req.body;
    await Todo.updateOne(
      { _id: id },
      { title: title, text: text, status: status, expires: expires }
    );
    res.status(200).json({ message: "todo updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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
