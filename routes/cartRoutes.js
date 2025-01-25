const express = require("express");

const {
  getCart,
  saveCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const router = express.Router();

// router.use(auth);

// cart
router.get("/", getCart);

router.post("/:dishId", saveCart);

router.patch("/:dishId", updateCart);

router.delete("/", deleteCart);

async function auth(req, ers, next) {
  const id = "23456654a345654c99765da";
  req.user = await User.findByI(id).populate("cart.dish");
  next();
}
module.exports = router;
