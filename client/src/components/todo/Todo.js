import React, { useState, useEffect } from "react";
import TodoHead from "./TodoHead";
import TodoContent from "./TodoContent";
import axios from "axios";
import PageTitle from "../layout/TitlePage";
import toast from "react-hot-toast";
import styles from "../../styles/modules/app.module.scss";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, [filter]);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    axios
      .post("http://localhost:5050/todo/fetchData", { token: token })
      .then((res) => {
        const todo = res.data.todos;
        const todos = todo.filter((task) => {
          if (filter === "all") {
            return task;
          } else {
            const taskValue = task.status === filter ? task : null;
            return taskValue;
          }
        });
        setTodos(todos);
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
        <TodoHead
          onTodoAdded={handleTodoAdded}
          updateTodoList={fetchTodos}
          setFilter={setFilter}
          filter={filter}
          todos={todos}
        />
        <TodoContent todos={todos} updateTodoList={fetchTodos} />
      </div>
    </div>
  );
}
