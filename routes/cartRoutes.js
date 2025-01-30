const express = require("express");
const User = require("../models/user");


const {
  getCart,
  saveCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const router = express.Router();

router.use(auth);

// cart
router.get("/",getCart);

router.post("/:dishId", saveCart);

router.patch("/:dishId", updateCart);

router.delete("/:dishId", deleteCart);

async function auth(req, ers, next) {
  const id = "6795d16762f2193673636635";
  req.user = await User.findById(id).populate("cartItems.dish");
  next();
}
module.exports = router;
