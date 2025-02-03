const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
  
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log(decoded)
      const user = await User.findById(decoded.id).populate("cartItems.dish");
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      req.user = user; // Attach the user to the request
      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication failed" });
    }
  };

  module.exports = authMiddleware;
  