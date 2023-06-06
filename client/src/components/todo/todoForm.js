import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ onTodoAdded }) => {
  const [form, setForm] = useState({
    text: "",
    title: "",
  });

  const token = localStorage.getItem("token");

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const isFormValid = form.title;

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5050/todo/create", {
        token: token,
        ...form,
      })
      .then((res) => {
        onTodoAdded(res.data.todo);
        setForm({ text: "", title: "" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">title*</label>
      <input
        type="text"
        className="form-control"
        value={form.title}
        id="title"
        onChange={(e) => updateForm({ title: e.target.value })}
      />
      <label htmlFor="text">text*</label>
      <input
        type="text"
        className="form-control"
        id="text"
        value={form.text}
        onChange={(e) => updateForm({ text: e.target.value })}
      />
      <button type="submit" disabled={!isFormValid}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
