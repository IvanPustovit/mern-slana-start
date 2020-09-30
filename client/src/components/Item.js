import React, { useContext, useEffect, useState } from "react";
import formatMoney from "@jlozovei/format-money";
import { Link, useHistory, useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { STOREGE_CART } from "../constant/constant";
import { useStorage } from "../hooks/storage.hook";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";
import Loader from "./Loader";

const Item = () => {
  const message = useMessage();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { getStor, setStor } = useStorage();
  const { request } = useHttp();
  const [item, setItem] = useState({});
  const [data, setData] = useState({});
  const idItem = useParams().id;

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitToCart = (e) => {
    let storage = getStor(STOREGE_CART);
    if (!storage) {
      setStor(STOREGE_CART, []);
    }
    storage = getStor(STOREGE_CART);
    const order = { ...item, ...data, amountInCart: 1 };
    const n = storage.find(
      (el) => el.color === data.color && el.size === data.size
    );
    if (n) {
      const index = storage.indexOf(n);
      storage[index] = { ...n, amountInCart: n.amountInCart + 1 };
      message("Товар добавлено в корзину!");
      return setStor(STOREGE_CART, storage);
    }

    storage.push(order);
    setStor(STOREGE_CART, storage.sort(byField("name")));
    auth.totalOrder();
    message("Товар добавлено в корзину!");
    history.push("/");
  };

  useEffect(() => {
    const data = request(`/api/${idItem}`, "GET");
    data.then((res) => setItem(res));
  }, [idItem, request]);

  function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  return (
    <>
      {isEmpty(item) && <Loader />}
      {!isEmpty(item) > 0 && (
        <div className="row main-container">
          <div className="col s12 m12 l12">
            <div className="card horizontal">
              <div className="card-image">
                <img className="img-modal" src={item.img} alt={item.alt} />
              </div>

              <div className="card-stacked">
                <p className="card-content card-name">
                  "{item.name.toUpperCase()}"
                </p>
                <div className="card-content">
                  <p>{item.info.toUpperCase()}</p>
                </div>

                <div>
                  <div className="input-field col s12">
                    <select
                      className="select-item"
                      name="color"
                      onChange={dataHandler}
                    >
                      <optgroup label="Україна">
                        <option></option>

                        <option value="білий-україна">Білий</option>
                      </optgroup>
                      <optgroup label="Турція">
                        <option className="bgr-white" value="білий-турція">
                          Білий
                        </option>
                        <option className="bgr-black" value="чорний-турція">
                          Чорний
                        </option>
                        <option className="bgr-grey" value="сірий-турція">
                          Сірий
                        </option>
                      </optgroup>
                      <optgroup label="Венгрія">
                        <option value="білий-венгрія">Білий</option>
                        <option value="чорний-венгрія">Чорний</option>
                        <option value="жовтий-венгрія">Жовтий</option>
                        <option value="синій-венгрія">Синій</option>
                        <option value="зелений-венгрія">Зелений</option>
                        <option value="сірий-венгрія">Сірий</option>
                        <option value="блакитний-венгрія">Блакитний</option>
                      </optgroup>
                    </select>
                    <label className="label-item">Виберіть колір</label>
                  </div>

                  <div className="input-field col s12">
                    <select
                      className="select-item"
                      name="size"
                      onChange={dataHandler}
                    >
                      <optgroup label="Розмір">
                        <option></option>
                        {item.size.split(",").map((el) => (
                          <option value={el} name={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <label className="label-item">Виберіть розмір</label>
                  </div>
                </div>

                <div className="card-action">
                  {!auth.isAuth && (
                    <Link to="/">
                      <p className="link-auth">
                        Щоб продовжити покупку зареєтруйтеся або увійдіть під
                        своїм логіном
                      </p>
                    </Link>
                  )}
                  {auth.isAuth && (
                    <button
                      class="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                      disabled={!data.color || !data.size}
                      onClick={submitToCart}
                    >
                      В корзину
                      <i class="material-icons right">send</i>
                    </button>
                  )}

                  <p className="item-price" pattern="\d+,\d{2}">
                    {formatMoney({
                      value: item.price,
                      currencyCode: "UAH",
                      locale: "UA",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
