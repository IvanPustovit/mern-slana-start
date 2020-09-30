import React from "react";
import CardItem from "./CardItem";

const ShopMain = ({ listItem }) => {
  return (
    <div className="row main-container">
      <ul className="col s12 m12">
        {listItem.map((item) => (
          <CardItem {...item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default ShopMain;
