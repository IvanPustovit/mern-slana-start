import React from "react";
import { Link } from "react-router-dom";
import formatMoney from "@jlozovei/format-money";

const CardItem = (item) => {
  return (
    <li className="col s12 l4 ">
      <div className="card fix">
        <div className="card-image">
          <img src={item.img} alt={item.alt} />

          <Link
            to={`/${item._id}`}
            className="btn-floating halfway-fab waves-effect waves-light red"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
        <div className="content-fix">
          <p className="card-info">
            {item.species} {item.category.toLowerCase()}
          </p>
          <p className="card-info_name">"{item.name.toUpperCase()}"</p>
        </div>

        <p className="card-price">
          {formatMoney({
            value: item.price,
            currencyCode: "UAH",
            locale: "UA",
          })}
        </p>
      </div>
    </li>
  );
};

export default CardItem;
