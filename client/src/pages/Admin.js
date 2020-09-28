import React from "react";
import Aside from "../components/AdminPanel/Aside";
import Main from "../components/AdminPanel/Main/Main";
import styles from "../components/AdminPanel/admin.module.css";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <Aside />
      <Main />
    </div>
  );
};

export default Admin;
