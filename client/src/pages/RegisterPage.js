import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

import "../index.css";

const RegisterPage = () => {
  const history = useHistory();
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      if (data) {
        history.push("/auth/login");
      }
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 ">
        <h1 className="widht-auth">Увійти до магазину</h1>

        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваше Ім'я"
                  id="name"
                  type="text"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Ваше ім'я</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш Email"
                  id="email"
                  type="email"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Ваш email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Напишіть Ваш пароль"
                  id="password"
                  type="password"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Ваш пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <Link to="/auth/login" name="action">
              Увійти
            </Link>
            <button
              className="btn yellow darken-4"
              type="submit"
              name="action"
              onClick={registerHandler}
              disabled={loading}
            >
              Зареєструватися
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
