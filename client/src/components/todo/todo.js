import React, { useState, useEffect } from "react";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import axios from "axios";
import PageTitle from "../layout/TitlePage";
import toast from "react-hot-toast";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    axios
      .post("http://localhost:5050/todo/fetchData", { token: token })
      .then((res) => {
        setTodos(res.data.todos);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.error);
      });
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <PageTitle>TODO List</PageTitle>
      <TodoForm onTodoAdded={handleTodoAdded} />
      <TodoList todos={todos} />
    </div>
  );
}
