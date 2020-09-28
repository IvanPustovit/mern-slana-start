module.exports = function (email, order) {
  return {
    to: "ataman12448812@gmail.com",
    from: "slanainfo2020@gmail.com",
    subject: "Нове замовлення",
    html: `<h1>Нове замовлення від ${order.name}(${email}) тел:${
      order.phone
    }</h1>
    <p>Замовлено:</p>
    <ul>${order.goods.map(
      (el) =>
        `<li>
        <img src=${el.img} width='100px' />
        <h2>Назва: ${el.name}</h2>
        <p>Категорія: ${el.species}</p>
        <p>Кількість: ${el.amountInCart}</p>
        <p>Колір: ${el.color}</p>
        <p>Розмір: ${el.size}</p>
        <p>Ціна: ${el.price}</p>
      </li>`
    )}</ul>
    <h3>Загальна сумма замовлення: ${order.sum}</h3>
    <h2>Доставка: ${order.adress}</h2>
    `,
  };
};
