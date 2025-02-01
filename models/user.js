const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: [CartItemSchema], // Embedded array of CartItems
  role: {
    type: String,
    enum: ["admin", "customer", "merchant"],
    required: true,
    default: "customer",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
