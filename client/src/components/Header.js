import React, { useContext, useState } from "react";
import M from "materialize-css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { STOREGE_CART } from "../constant/constant";
import { useHttp } from "../hooks/http.hook";

const Header = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  });
  const { getMethod } = useHttp();

  const auth = useContext(AuthContext);

  const [listItem, setlistItem] = useState();

  const logoutHandler = () => {
    auth.logout(STOREGE_CART);
    auth.totalOrder();
  };

  const filterItem = async (e) => {
    const data = await getMethod(`/${e.target.name}`, "GET");
    setlistItem(data);
    // history.push(`/shop/t-shirts`);
  };

  return (
    <AuthContext.Consumer>
      {(user) => (
        <>
          <nav className="brown lighten-1 z-depth-4 navigation">
            <p className="baner">
              Сайт на стадії розробки, може не працювати увесь функціонал
            </p>
            <div className="nav-wrapper">
              {user.isAuth && (
                <p className="hello">
                  Вітамо{" "}
                  <Link to="/profile" className="name-user">
                    {user.userName}
                  </Link>
                </p>
              )}
              <Link to="/" className="brand-logo logo-pad ">
                <img
                  alt=""
                  className="responsive-img"
                  width="100vh"
                  src="/logo.png"
                />
              </Link>

              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <Link to="/cart" className="count mobile-cart">
                <i className=" material-icons medium">add_shopping_cart</i>
                <span className="cou mobile-count">{auth.countCart}</span>
              </Link>
              <ul className="right hide-on-med-and-down">
                <li>
                  <NavLink
                    to={`/shop/`}
                    name="Футболка"
                    // onClick={filterItem}
                  >
                    Футболки
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/`} name="Рушники" onClick={filterItem}>
                    Рушники
                  </NavLink>
                </li>
                <li>
                  <Link to="/cart" className="count">
                    <i className=" material-icons medium">add_shopping_cart</i>
                    <span className="cou">{auth.countCart}</span>
                  </Link>
                </li>
                {user.isAuth && (
                  <li>
                    <Link to="/" onClick={logoutHandler}>
                      Вийти
                    </Link>
                  </li>
                )}
                {!user.isAuth && (
                  <li>
                    <Link to="/auth/login">Увійти</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <ul className="sidenav" id="mobile-demo">
            <li>
              <a href="sass.html">Футболки</a>
            </li>
            <li>
              <a href="badges.html">Рушники</a>
            </li>
          </ul>
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
