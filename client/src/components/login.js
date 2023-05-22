import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Create() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const isFormValid = form.email && form.password;

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const userData = { ...form };
    axios
      .get("http://localhost:5050/record/user", {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => navigate("/"))
      .catch((err) => {
        console.log(err.message);
        setForm({ email: "", password: "" });
      });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Login with Useraccount</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="position">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            disabled={!isFormValid}
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
