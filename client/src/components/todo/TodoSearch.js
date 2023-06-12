import React, { useState } from "react";
import styles from "../../styles/modules/search.module.scss";

function TodoSearch({ todos }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter todos based on search query
  const searchTodos = (query) => {
    query = query.toLowerCase();
    return todos.filter((todo) => todo.title.toLowerCase().startsWith(query));
  };

  // Perform the search and get the matching todos
  const searchResults = searchTodos(searchQuery);

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Enter todo title"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {searchQuery && (
        <ul>
          {searchResults.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoSearch;
