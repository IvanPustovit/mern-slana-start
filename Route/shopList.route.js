const exspress = require("express");

const {
  getItem,
  getItemId,
  getItemFilter,
} = require("../Controllers/ItemControler");
const { addOrder } = require("../Controllers/OrderControler");
const { addItem, deleteItem } = require("../Controllers/adminPanelControler");
const { uploadImgToStorage } = require("../middleware/file");

const router = exspress.Router();

router.get("/get", getItem);
router.post("/add", addItem);
router.delete("/delete", deleteItem);
// router.post("/", addItem);
router.get("/:id", getItemId);
router.post("/post/order", addOrder);
// router.get("/:name", getItemFilter);

// router.post("/post/order", addOrder);

module.exports = router;
