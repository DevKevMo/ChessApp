import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "../../styles/modules/search.module.scss";
import TodoModal from "./TodoModal";

function TodoSearch({ todos, updateTodo }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [todoObj, setTodo] = useState(false);

  // Function to handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter todos based on search query
  const searchTodos = (query) => {
    query = query.toLowerCase();
    return todos.filter((todo) => todo.title.toLowerCase().startsWith(query));
  };

  const openUpdateWindow = (todo) => {
    setTodo(todo);
    setSearchQuery("")
    setModalOpen(true);
  };

  // Perform the search and get the matching todos
  const searchResults = searchTodos(searchQuery);

  return (
    <div style={{ position: "relative" }}>
      <div className={styles.searchbarstyle}>
        <BsSearch className={styles.searchiconstyle} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className={styles.inputstyle}
        />
      </div>
      {searchQuery && (
        <ul className={styles.searchresultsstyle}>
          {searchResults.map((todo) => (
            <li key={todo.id}>
              <button onClick={() => openUpdateWindow(todo)}>
                {todo.title}
              </button>
            </li>
          ))}
        </ul>
      )}
      <TodoModal
        type="update"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        todo={todoObj}
        updateTodoList={updateTodo}
      ></TodoModal>
    </div>
  );
}

export default TodoSearch;
