const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserModel = require("../Models/userModel");

async function userRegister(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ message: `Користувач з email ${email} уже існує` });
    }
    const hashedPassword = await bcript.hash(password, 5);
    const newUser = new UserModel({ email, password: hashedPassword, name });
    await newUser.save();

    res.status(201).send({ id: newUser._id });
  } catch (error) {
    res.status(500).json({ message: `"ERROR register", ${error}` });
    console.log("ERROR register", error);
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: `Користувача з email ${email} не знайдено` });
    }
    const isMatch = await bcript.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "невірний пароль" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: `"ERROR login", ${error}` });
    console.log("ERROR login", error);
  }
}

module.exports = { userRegister, userLogin };
