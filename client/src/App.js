import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Create from "./components/user/Create.js";
import Login from "./components/user/Login.js";
import ToDo from "./components/todo/App.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
          console.log(res.data.message);
        })
        .catch((err) => {
          toast.error(err.message);
        });
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
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
