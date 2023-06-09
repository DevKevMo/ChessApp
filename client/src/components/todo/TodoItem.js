/* import { format } from "date-fns"; TODO: Add date to you todos*/
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "../../styles/modules/todoItem.module.scss";
import { getClasses } from "../../utils/getClasses";
import CheckButton from "./CheckButton";
import TodoModal from "./TodoModal";
import axios from "axios";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const token = localStorage.getItem("token");

function TodoItem({ todo, updateTodoList }) {
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    //updateFunction
    axios
      .post("http://localhost:5050/todo/check", {
        token: token,
        id: todo._id,
        checked: checked,
      })
      .then((res) => {
        updateTodoList();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(JSON.parse(err.request.response).error);
      });
  };

  const handleDelete = () => {
    //delte function
    axios
      .post("http://localhost:5050/todo/remove", {
        token: token,
        id: todo._id,
      })
      .then((res) => {
        updateTodoList();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(JSON.parse(err.request.response).error);
      });
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <div className={styles.todoText}>{todo.title}:</div>
            <div
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.text}
            </div>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
        updateTodoList={updateTodoList}
      />
    </>
  );
}

export default TodoItem;
