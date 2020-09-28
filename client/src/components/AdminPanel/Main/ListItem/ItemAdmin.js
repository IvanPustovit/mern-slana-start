import React, { useContext, useEffect } from "react";
import formatMoney from "@jlozovei/format-money";
import { AuthContext } from "../../../../context/AuthContext";
import { useHttp } from "../../../../hooks/http.hook";

import styles from "../../admin.module.css";

const ItemAdmin = (good) => {
  const { getMethod, request } = useHttp();
  const { formUpdate } = useContext(AuthContext);
  const updateGood = async () => {
    try {
      const id = good._id;
      const data = await getMethod(`/get/${id}`);
      formUpdate(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGood = async () => {
    try {
      const id = good._id;
      console.log(id);
      const data = await request("/admin/delete", "DELETE", { id });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMethod("/get");
  }, [getMethod]);
  return (
    <li className="row">
      <div className="col s12 l12">
        <div className="card fix">
          <div className="card-image">
            <img src={good.img} alt={good.name} />
          </div>
          <div className="card-content">
            <span className="card-title">{good.name}</span>

            <p>
              {good.species} {good.category.toLowerCase()}
            </p>
            <p>
              {formatMoney({
                value: good.price,
                currencyCode: "UAH",
                locale: "UA",
              })}
            </p>
          </div>
          <div className={`card-action ${styles.card}`}>
            <button type="submit" className="button-to" onClick={updateGood}>
              Редагувати
            </button>
            <button type="submit" className="button-to" onClick={deleteGood}>
              Видалити
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemAdmin;
