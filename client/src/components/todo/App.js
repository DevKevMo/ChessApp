import React, { useState, useEffect } from "react";
import TodoHead from "./TodoHead";
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
        const todo = res.data.todos;
        const filter = document.getElementById("status").value;
        const todos = todo.filter((task) => {
          if (filter === "all") {
            return task; // Return all tasks
          } else if (filter === "open") {
            return task.status === "incomplete" ? task : null; // Return open/incomplete tasks
          } else if (filter === "done") {
            return task.status === "complete"; // Return done/complete tasks
          }
          return false;
        });
        setTodos(todos);

        console.log(res.data.message);
      })
      .catch((err) => {
        toast.error(err.error);
      });
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className={styles.content__wrapper}>
      <PageTitle>TODO List</PageTitle>
      <div className={styles.app_wrapper}>
        <TodoHead onTodoAdded={handleTodoAdded} updateTodoList={fetchTodos} />
        <TodoContent todos={todos} updateTodoList={fetchTodos} />
      </div>
    </div>
  );
}
