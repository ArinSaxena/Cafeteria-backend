const User = require("../models/user");

const getCart = async (req, res) => {
  // also fetch user details
  const cart = req.user.cart;
  res.json(cart);
};
const saveCart = async (req, res) => {
  req.user.cart.push({ dish: req.params.dishId, quantity: 1 });
  const cart = req.user.cart;
  await req.user.save();
  res.status(201).json(cart);
};

const updateCart = async (req, res) => {
  const item = req.user.cart.find((item) => item.dish.id === req.params.dishId);
  item.quantity += req.body.changeQuantity;
  const cart = req.user.cart;
  await req.user.save();
  res.json(cart);
};

const deleteCart = async (req, res) => {
  req.user.cart = [];
  await req.user.save();
  res.json(cart);
};
module.exports = { getCart, saveCart, updateCart, deleteCart };
