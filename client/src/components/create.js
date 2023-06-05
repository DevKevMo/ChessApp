import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const isFormValid =
    form.name && form.email && form.password && form.passwordAgain;

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    if (newPerson.password === newPerson.passwordAgain) {
      axios
        .post("http://localhost:5050/signup", {
          name: newPerson.name,
          email: newPerson.email,
          password: newPerson.password,
          confirmPassword: newPerson.passwordAgain,
        })
        .then((res) => {
          debugger;
          localStorage.setItem("token", res.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
          setForm({ name: "", email: "", password: "", passwordAgain: "" });
        });
    } else {
      alert("password is not the same");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New User Account</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
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
          <label htmlFor="password">password*</label>
          <input
            type="password"
            className="form-control"
            id="passwordAgain"
            value={form.passwordAgain}
            onChange={(e) => updateForm({ passwordAgain: e.target.value })}
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
