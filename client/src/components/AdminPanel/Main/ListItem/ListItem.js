import React, { useState, useEffect } from "react";
import { useHttp } from "../../../../hooks/http.hook";
import ItemAdmin from "./ItemAdmin";

import styles from "../../admin.module.css";

const ListItem = () => {
  const [listGoods, setListGoods] = useState([]);
  const { getMethod } = useHttp();

  useEffect(() => {
    const data = getMethod("/api/get", "GET");
    data.then((res) => setListGoods(res));
  }, [getMethod]);

  return (
    <ul className={styles["admin-list"]}>
      {listGoods.map((good) => (
        <ItemAdmin {...good} key={good._id} />
      ))}
    </ul>
  );
};

export default ListItem;
