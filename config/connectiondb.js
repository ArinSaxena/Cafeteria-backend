const mongoose = require('mongoose');
const { MONGO_URI } = require('./envConfig');

mongoose
  .connect(MONGO_URI,)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));