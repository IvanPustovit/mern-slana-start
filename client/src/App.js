import React from "react";
import { BrowserRouter } from "react-router-dom";

import routesisAuth from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useItem } from "./hooks/item.hook";

import "materialize-css";

function App() {
  const { token, login, logout, userId, userName } = useAuth();
  const { totalOrder, count, listCart, form, formUpdate } = useItem();
  const isAuth = !!token;
  const countCart = count;
  const formItem = form;
  const route = routesisAuth(isAuth);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuth,
        userName,
        countCart,
        totalOrder,
        listCart,
        formItem,
        formUpdate,
      }}
    >
      <BrowserRouter>
        <div className="container">{route}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
