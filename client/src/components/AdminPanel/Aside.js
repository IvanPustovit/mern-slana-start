import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./admin.module.css";
const activeStyle = {
  color: "black",
};

const Aside = () => {
  return (
    <aside>
      <div className="aside">
        <div className={styles.aside}>
          <NavLink
            to={{
              pathname: "/admin/goods",
            }}
            className={styles["aside-link"]}
            exact
            activeStyle={activeStyle}
          >
            Товари
          </NavLink>

          <NavLink to="/admin/contact" className={styles["aside-link"]}>
            Контакти
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
