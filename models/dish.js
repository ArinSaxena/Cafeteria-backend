const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const DishSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    // required: true,
    // validate: {
    //   validator: function (value) {
    //     return value > 0;
    //   },
    //   message: "Price must be greater than zero.",
    // },
  },
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
