import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Create from "./components/create.js";
import Cookies from "js-cookie"

const App = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const sessionCookie = Cookies.get("sessionToken");
    if (sessionCookie) {
        //axios
        //success? setUser(returned user from API request)
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={user ? <div>Moin, {user.name}</div> : <div>Wer das</div>} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
