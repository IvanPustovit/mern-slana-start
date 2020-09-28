const ItemModel = require("../Models/itemModel");

async function getItem(req, res, next) {
  try {
    const item = await ItemModel.find();

    return res.status(200).send(item);
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function getItemFilter(req, res) {
  try {
    console.log("START");
    const { name } = req.params;
    console.log(req.params);
    const item = await ItemModel.find({
      species: name,
    });
    res.status(200).send(item);
  } catch (error) {
    console.log(error);
  }
}

async function getItemId(req, res, next) {
  try {
    const { id } = req.params;
    const item = await ItemModel.findById(id);

    return res.status(200).send(item);
  } catch (error) {
    console.log("ERROR", error);
  }
}

module.exports = { getItem, getItemId, getItemFilter };
