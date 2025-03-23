const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DishSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
  },
  description: { type: String },
  image: { type: String, required: true }, // Store image path
  // imageId: { type: String, required: true }, // Store image path

  inStock: {
    type: Boolean,
    default: true,
  },
  counter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counter",
    required: true,
  },
});

const Dish = mongoose.model("Dish", DishSchema);

module.exports = Dish;
