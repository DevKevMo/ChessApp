import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import TodoSearch from "./TodoSearch";
import styles from "../../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";

const TodoHead = ({
  onTodoAdded,
  updateTodoList,
  setFilter,
  filter,
  todos,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoSearch todos={todos}></TodoSearch>
      <TodoModal
        type="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onTodoAdded={onTodoAdded}
      ></TodoModal>
    </div>
  );
};

export default TodoHead;
