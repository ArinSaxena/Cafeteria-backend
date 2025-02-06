const User = require("../models/user");

const getCart = async (req, res) => {
  // also fetch user details
  // console.log(req.user)
  const id = req.user;

  req.user = await User.findById(id).populate("cartItems.dish");
  const cart = req.user;
  res.json(cart);
};
const saveCart = async (req, res) => {
  const { quantity } = req.body;
  const dishId = req.params.dishId;
  // console.log(dishId)
  if (!req.user) {
    return res.status(401).json({ error: "User not found" });
  }
  if (!dishId) {
    return res.status(400).json({ error: "Dish ID is required" });
  }
  req.user.cartItems.push({ dish: dishId, quantity });
  await req.user.save().then((u) => u.populate("cartItems.dish"));
  res.status(201).json(req.user.cartItems);
  // console.log(req.user.cartItems);
};

const updateCart = async (req, res) => {
  const {dishId} = req.params;
  // const {quantity} = req.body;
  const { action } = req.body;
  try {
    const id = req.user._id;

    const user = await User.findById(id).populate("cartItems.dish");
    console.log(user.cartItems)
console.log(dishId)
    const item = user.cartItems.find((item) => item._id == dishId); // id comparison problem
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart." });
    }
    if (action === "increment") {
      item.quantity += 1;
    } else {
      item.quantity -= 1;
    }

    await user.save(); 

    res.status(200).json({ message: "Cart item updated.", cart: user.cartItems });
  } catch (error) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ error: "Failed to update cart item." });
  }
};

const deleteCart = async (req, res) => {
  console.log("Hello");
  const dishId = req.params.dishId;
  console.log(dishId);

  await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { cartItems: { _id: dishId } } },
    { new: true }
  );

  res.json(req.user.cartItems);
};
module.exports = { getCart, saveCart, updateCart, deleteCart };
