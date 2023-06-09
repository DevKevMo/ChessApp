import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PageTitle from "../layout/TitlePage";

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

  const inputStyle = {
    display: "block",
    padding: "1.4rem 0.75rem",
    width: "100%",
    fontSize: "0.8rem",
    lineHeight: 1.25,
    color: "#55595c",
    backgroundColor: "#fff",
    backgroundImage: "none",
    backgroundClip: "padding-box",
    borderTop: "0",
    borderRight: "0",
    borderBottom: "1px solid #eee",
    borderLeft: "0",
    borderRadius: "3px",
    transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)",
  };

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <PageTitle style={{ color: "grey" }}>Create New User Account</PageTitle>
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
            style={inputStyle}
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
