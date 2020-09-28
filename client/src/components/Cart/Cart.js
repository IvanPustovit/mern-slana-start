import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CartForm from "./CartForm";
import CartItem from "./CartItem";

const Cart = () => {
  const { listCart } = useContext(AuthContext);

  return (
    <div>
      {!listCart && <p>Ваша корзина пуста</p>}
      {listCart && (
        <ul className="list-cart">
          {listCart.map((el, index) => (
            <CartItem {...el} key={index} index={index} />
          ))}
        </ul>
      )}
      <CartForm />
    </div>
  );
};

export default Cart;
