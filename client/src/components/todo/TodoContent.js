import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "../../styles/modules/app.module.scss";
import TodoItem from "./TodoItem";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const TodoContent = ({ todos, updateTodoList }) => {
  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodoList={updateTodoList}
          ></TodoItem>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoContent;
