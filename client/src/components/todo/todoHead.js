import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";

const TodoHead = ({ onTodoAdded, updateTodoList }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    updateTodoList();
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="open">Incomplete</option>
        <option value="done">Completed</option>
      </SelectButton>
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
