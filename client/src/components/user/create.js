import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PageTitle from "../layout/TitlePage";
import styles from "../../styles/modules/user.module.scss";
import toast from "react-hot-toast";

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
          localStorage.setItem("token", res.data.sessionToken);
          toast.success(res.data.message);
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
    <div className={styles.content}>
      <PageTitle style={{ color: "grey" }}>Create New User Account</PageTitle>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        <label htmlFor="position">E-mail</label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={(e) => updateForm({ email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => updateForm({ password: e.target.value })}
        />

        <label htmlFor="password">password*</label>
        <input
          type="password"
          id="passwordAgain"
          value={form.passwordAgain}
          onChange={(e) => updateForm({ passwordAgain: e.target.value })}
        />
        <input type="submit" disabled={!isFormValid} value="Create User" />
      </form>
    </div>
  );
}
