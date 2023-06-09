import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";

const TodoForm = ({ onTodoAdded }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    //Change stuff
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
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
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

export default TodoForm;
