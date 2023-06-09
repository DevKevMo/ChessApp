import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PageTitle from "../layout/TitlePage";
import styles from "../../styles/modules/user.module.scss";
import toast from "react-hot-toast";

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
      .post("http://localhost:5050/signin", {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.sessionToken);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setForm({ email: "", password: "" });
      });
  }

  return (
    <div className={styles.content}>
      <PageTitle style={{ color: "grey" }}>Login with Useraccount</PageTitle>
      <form onSubmit={onSubmit} className={styles.form}>
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
        <input type="submit" disabled={!isFormValid} value="login" />
      </form>
    </div>
  );
}
