import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";

import Delivery from "../components/Delivery";
import Footer from "../components/Footer";
import ShopMain from "../components/ShopMain/ShopMain";
import Loader from "../components/Loader";

const Home = () => {
  const [listItem, setlistItem] = useState([]);
  const { getMethod } = useHttp();

  useEffect(() => {
    const data = getMethod("/api/get", "GET");
    data.then((res) => setlistItem(res));
  }, [getMethod]);

  return (
    <>
      {!listItem.length && <Loader />}
      {listItem.length > 0 && (
        <div>
          <ShopMain listItem={listItem} />
          <Delivery />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
