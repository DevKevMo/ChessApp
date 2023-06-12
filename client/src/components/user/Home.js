import React, { useState } from "react";
import PageTitle from "../layout/TitlePage";
import styles from "../../styles/modules/user.module.scss";

export default function Home({ setUser, user }) {
  const pageTitle = user ? user.name : ",bitte anmelden";

  return (
    <div className={styles.content}>
      <PageTitle style={{ color: "grey" }}>Hallo {pageTitle} </PageTitle>
    </div>
  );
}
