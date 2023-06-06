import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Create from "./components/user/create.js";
import Login from "./components/user/login.js";
import ToDo from "./components/todo/todo.js";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5050/userData", {
          token: token,
        })
        .then((res) => {
          setUser(res.data.userData.email);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <div>Moin, {user}</div> : <div>Wer das</div>}
        />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </div>
  );
};

export default App;
