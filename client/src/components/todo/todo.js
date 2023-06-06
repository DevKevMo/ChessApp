import React, { useState, useEffect } from "react";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import axios from "axios";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    axios
      .post("http://localhost:5050/todo/fetchData", { token: token })
      .then((res) => {
        setTodos(res.data.todos);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm onTodoAdded={handleTodoAdded} />
      <TodoList todos={todos} />
    </div>
  );
}
