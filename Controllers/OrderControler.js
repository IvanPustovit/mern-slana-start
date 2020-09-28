const { transporter } = require("../helper/nodemailer");
const OrderModel = require("../Models/orderModel");

const emailOrder = require("../emails/order");
const telegram = require("../telegram");

async function addOrder(req, res) {
  try {
    const { name, email, phone, adress, count, sum, goods, owner } = req.body;
    const order = {
      owner,
      name,
      email,
      phone,
      adress,
      count,
      sum,
      goods,
    };
    const newOrder = await OrderModel.create(order);

    res.status(201).send(newOrder);
    await transporter.sendMail(emailOrder(email, newOrder));
    telegram();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addOrder };
