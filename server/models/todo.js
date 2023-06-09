import mongoose from "mongoose";

const todoShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "no text",
  },
  userId: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoShema);
export default Todo;