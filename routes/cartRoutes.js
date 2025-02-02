const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getCart,
  saveCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartControllers");
const router = express.Router();

router.get("/",authMiddleware, getCart);

router.post("/:dishId",authMiddleware, saveCart);

router.patch("/:dishId", authMiddleware, updateCart);

router.delete("/:dishId", authMiddleware, deleteCart);

async function auth(req, ers, next) {
  const id = "6795d16762f2193673636635";
  req.user = await User.findById(id).populate("cartItems.dish");
  next();
}
module.exports = router;
