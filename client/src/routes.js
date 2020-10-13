import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import RegisterPage from "./pages/RegisterPage";

const routesIsAuth = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/" exact>
          <Header />
          <Home />
        </Route>
        <Route path="/cart" exact>
          <Header />
          <CartPage />
          <Footer />
        </Route>
        <Route path="/admin" exact>
          <Header />
          <Admin />
          <Footer />
        </Route>
        <Route path="/admin/goods" exact>
          <Header />
          <Admin />
          <Footer />
        </Route>
        <Route path="/shop/:id">
          <Header />
          <ItemPage />
          <Footer />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Header />
        <Home />
      </Route>
      <Route path="/cart" exact>
        <Header />
        <CartPage />
      </Route>
      <Route path="/auth/login" exact>
        <Header />
        <AuthPage />
      </Route>
      <Route path="/auth/register" exact>
        <Header />
        <RegisterPage />
      </Route>
      <Route path="/shop/:id">
        <Header />
        <ItemPage />
        <Footer />
      </Route>
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default routesIsAuth;
