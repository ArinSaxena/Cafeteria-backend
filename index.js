require('dotenv').config();
require('./config/connectiondb')
const express =  require('express');
const mongoose =  require('mongoose');
const bcrypt =  require('bcrypt');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const dishRouter = require('./routes/dishRoutes');
const counterRouter = require('./routes/counterRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);

app.use("/users", userRouter);
app.use("/dishes", dishRouter);
app.use("/counter", counterRouter);
app.use("/cart", cartRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

