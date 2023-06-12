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
  status: {
    type: String,
    default: "incomplete",
  },
  userId: {
    type: String,
    required: true,
  },
  expires:{
    type: Date,
    default: Date.now,
  }
});

const Todo = mongoose.model("Todo", todoShema);
export default Todo;
