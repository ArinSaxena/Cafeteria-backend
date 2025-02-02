const User = require("../models/user");

const getCart = async (req, res) => {
  // also fetch user details
  console.log(req.user)
  const id = req.user;
  
  req.user = await User.findById(id).populate("cartItems.dish");
  const cart = req.user;
  res.json(cart);
};
const saveCart = async (req, res) => {
  const {quantity} = req.body;
  const dishId = req.params.dishId;
  console.log(dishId)
  if (!req.user) {
    return res.status(401).json({ error: "User not found" });
  }
  if (!dishId) {
    return res.status(400).json({ error: "Dish ID is required" });
  }
  req.user.cartItems.push({dish:dishId, quantity });      //                     ?
  await req.user.save().then((u) => u.populate("cartItems.dish"));
  console.log("qwer",req.user.cartItems)
  res.status(201).json(req.user.cartItems);
  // console.log(req.user.cartItems);
};

const updateCart = async (req, res) => {
  const {dishId } = req.params;
  const {quantity} = req.body;
  try{
    const id = "6795d16762f2193673636635";
    // const id = req.user._id;

    const user = await User.findById(id).populate("cartItems.dish");
  
  if(!quantity || quantity <1){
    return res.status(400).json({ error: "Quantity must be at least 1." });

  }
  const item = user.cartItems.find((item) => item._id === dishId);
  if (!item) {
    return res.status(404).json({ error: "Item not found in cart." });
  }
  item.quantity += quantity; // Update the quantity
  await user.save(); // Save the updated user document

  res.status(200).json({ message: "Cart item updated.", cart: user.cartItems });
} catch (error) {
  console.error("Error updating cart:", error.message);
  res.status(500).json({ error: "Failed to update cart item." });
}
};


const deleteCart = async (req, res) => {
  const dishId = req.params.dishId;
  req.user.cartItems= req.user.cartItems.filter((cartItem) => cartItem.dish.toString() !== dishId)
  await req.user.save();
  console.log(req.user);
  res.json(req.user.cartItems);
};
module.exports = { getCart, saveCart, updateCart, deleteCart };
