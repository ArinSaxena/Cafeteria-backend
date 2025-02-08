const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  image:{type:String, default:""},
  name: { type: String, required: true },
  merchant: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = Counter;