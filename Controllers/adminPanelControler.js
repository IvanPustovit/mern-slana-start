const itemModel = require("../Models/itemModel");
const ItemModel = require("../Models/itemModel");

async function addItem(req, res, next) {
  try {
    const {
      _id,
      article,
      category,
      img,
      info,
      name,
      price,
      size,
      sizeImg,
      species,
      styleImg,
      MadeIn,
    } = req.body;

    const item = {
      article,
      category,
      img,
      info,
      name,
      price,
      size,
      sizeImg,
      species,
      styleImg,
      MadeIn,
    };

    if (_id) {
      await ItemModel.findById(_id);
      const updateItem = await ItemModel.findByIdAndUpdate(_id, item, {
        new: true,
      });
      return res.status(200).send(updateItem);
    }

    const newItem = await ItemModel.create(item);

    return res.status(201).send(newItem);
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function deleteItem(req, res) {
  const id = req.body.id;
  console.log(req.body);
  const item = await itemModel.findByIdAndDelete(id);
  res.status(200).send(item);
}

// async function updateItem(req, res) {
//   const item = await ItemModel.findById();
// }

module.exports = { addItem, deleteItem };
