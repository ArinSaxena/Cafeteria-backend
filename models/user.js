const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cartItems: [CartItemSchema], // Embedded array of CartItems
  role: {type: String,enum: ["admin", "user", "merchant"],required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
