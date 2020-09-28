import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

import "../index.css";

const AuthPage = () => {
  const auth = useContext(AuthContext);

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

  const loginHandler = async () => {
    try {
      const data = await request("/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId, data.name);
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
            <button
              className="btn waves-effect waves-light btn-auth-m"
              type="submit"
              name="action"
              onClick={loginHandler}
              disabled={loading}
            >
              Увійти
            </button>
            <Link to="/auth/register" name="action">
              Зареєструватися
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
