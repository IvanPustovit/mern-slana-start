import { useCallback, useEffect, useState } from "react";
import { useStorage } from "./storage.hook";
import { STOREGE_CART } from "../constant/constant";
export const useItem = () => {
  const { getStor } = useStorage();
  const [count, setCount] = useState(0);
  const [listCart, setListCart] = useState(null);
  const [form, setForm] = useState({
    _id: "",
    article: "",
    category: "",
    img: "",
    info: "",
    name: "",
    price: "",
    size: "",
    sizeImg: "",
    species: "",
    styleImg: "",
    MadeIn: "",
  });

  const totalOrder = useCallback(() => {
    const item = getStor(STOREGE_CART);
    if (!item) {
      setCount(0);
      setListCart(null);
    } else {
      setCount(item.reduce((acc, el) => acc + el.amountInCart, 0));
    }
    setListCart(item);
  }, [getStor]);

  const formUpdate = useCallback(async (data) => {
    try {
      setForm(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const item = getStor(STOREGE_CART);
    if (item) {
      totalOrder();
    }
  }, [totalOrder, getStor]);

  return { totalOrder, count, listCart, form, formUpdate };
};
