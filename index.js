require('dotenv').config();
require('./config/connectiondb')
const express =  require('express');
const mongoose =  require('mongoose');
const bcrypt =  require('bcrypt');
const multer = require('multer');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const dishRouter = require('./routes/dishRoutes');
const counterRouter = require('./routes/counterRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require("path")

const app = express();

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", 
      allowedHeaders: ["Content-Type", "Authorization"], 
    })
  );
  
  // Handle preflight requests properly
  app.options("*", cors()); // Respond to preflight requests
  

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/auth", authRoutes);

app.use("/users", userRouter);
app.use("/dishes", dishRouter);
app.use("/counter", counterRouter);
app.use("/cart", cartRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

