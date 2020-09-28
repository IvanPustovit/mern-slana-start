import React, { useContext, useState } from "react";
import formatMoney from "@jlozovei/format-money";

import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { STOREGE_CART } from "../../constant/constant";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CartForm = () => {
  const { request } = useHttp();
  const { listCart, userId, totalOrder } = useContext(AuthContext);
  const history = useHistory();
  const [form, setForm] = useState("");

  const allOrderCount = () => {
    if (listCart) {
      const allOrder = listCart.reduce((acc, el) => {
        acc += el.amountInCart;
        return acc;
      }, 0);
      return allOrder;
    }
  };

  const allOrderCountSum = () => {
    if (listCart) {
      const allOrder = listCart.reduce((acc, el) => {
        acc += el.amountInCart * el.price;
        return acc;
      }, 0);
      return allOrder;
    }
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const submitOrder = async () => {
    try {
      const newOrder = {
        ...form,
        goods: listCart,
        count: allOrderCount(),
        sum: allOrderCountSum(),
        owner: userId,
      };

      const data = await request("/cart/post/order", "POST", newOrder);

      if (data) {
        localStorage.removeItem(STOREGE_CART);
        setForm("");
        totalOrder();
        M.toast({ html: "Дякуємо за замовлення.", classes: "rounded" });
        history.push("/shop");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 order-input">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Всього: {allOrderCount()} шт</span>
            <span className="card-title">
              Сумма замовлення:
              <span className="total-sum">
                {formatMoney({
                  value: allOrderCountSum(),
                  currencyCode: "UAH",
                  locale: "UA",
                })}
              </span>
            </span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваше ім'я"
                  id="name"
                  type="text"
                  value={form.name}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Як Вас звати:</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш Email"
                  id="email"
                  type="email"
                  value={form.email}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Ваш email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш номер телефону"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="phone">Ваш номер телефону</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть адресу доставки"
                  id="adress"
                  type="text"
                  value={form.adress}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="adress">Ваш адреса</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect waves-light btn-auth-m"
              type="submit"
              name="action"
              onClick={submitOrder}
              disabled={listCart === null}
            >
              Замовити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartForm;
