const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: "Dish", required: true ,
    validate:{
        validator: async function (dishId) {
            const dishExists = await mongoose.model('Dish').exists({_id:dishId})
            return dishExists;
        },
        message:'Invalid dish reference'
    }
  },
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
