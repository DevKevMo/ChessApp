import React, { useState, useEffect } from "react";
import TodoForm from "./todoHead";
import TodoContent from "./TodoContent";
import axios from "axios";
import PageTitle from "../layout/TitlePage";
import toast from "react-hot-toast";
import styles from "../../styles/modules/app.module.scss";

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
      <div className={styles.app_wrapper}>
        <TodoForm onTodoAdded={handleTodoAdded} />
        <TodoContent todos={todos} />
      </div>
    </div>
  );
}
