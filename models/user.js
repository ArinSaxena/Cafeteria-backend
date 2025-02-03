const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartItems: [
    {
      dish: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
      quantity: { type: Number, required: true, min: 1 },
    
    },
  ],
  role: {
    type: String,
    enum: ["admin", "customer", "merchant"],
    default: "customer",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
