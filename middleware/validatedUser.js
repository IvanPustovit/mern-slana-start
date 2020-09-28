const { check, validationResult } = require("express-validator");

check("email", "Невірний формат електроної пошти").isEmail,
  check("password", "Мінімум 6 символів").isLength({ min: 6 });

function userValidate(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Не коректні дані",
    });
  }
  next();
}

function userValidation(req, res, next) {
  const { email, password, name } = req.body;

  const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passValidNumber = /(?=.*[0-9])[0-9a-zA-Z!@#$%^&*]/g;
  const passValidSymbol = /(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]/g;
  const passValidString = /(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g;
  const passValidLength = /[0-9a-zA-Z!@#$%^&*]{6,}/g;
  const isEmailValid = emailValid.test(email);
  const isPassValidNumber = passValidNumber.test(password);
  const isPassValidSymbol = passValidSymbol.test(password);
  const isPassValidString = passValidString.test(password);
  const isPassValidLength = passValidLength.test(password);
  if (!isEmailValid) {
    return res
      .status(400)
      .send({ message: "Невірний формат email", body: req.body });
  } else if (
    !isPassValidNumber ||
    // !isPassValidSymbol ||
    !isPassValidString ||
    !isPassValidLength
  ) {
    return res.status(400).send({
      message: `Невірний формат пароля. Має бути: ${
        isPassValidNumber ? "" : "одна або декілька цифр; "
      }${isPassValidString ? "" : "дві і більше букв - маленька і велика; "}${
        isPassValidLength ? "" : "довжина пороля має бути від 6 символів;"
      }`,
    });
  } else if (name !== undefined) {
    const isNameValid = name.length >= 3;
    if (!isNameValid) {
      return res
        .status(400)
        .send({ message: "Name must be more then 3 letters" });
    } else {
      next();
    }
  } else {
    next();
  }
}

module.exports = { userValidate, userValidation };
