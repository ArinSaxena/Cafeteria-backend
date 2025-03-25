require('./config/connectiondb')
const express =  require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const dishRouter = require('./routes/dishRoutes');
const counterRouter = require('./routes/counterRoutes');
const cartRouter = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require("path");
const { FRONTEND_URL, PORT } = require('./config/envConfig');

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",  // Local frontend
  "https://cafeteria-frontend-git-main-arin-saxenas-projects.vercel.app" // Deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(
//     cors({
//       origin: "http://localhost:3000", 
//       allowedHeaders: ["Content-Type", "Authorization"], 
//     })
//   );
  
//   app.options("*", cors()); // Respond to preflight requests
  

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/auth", authRoutes);
app.use("/users", userRouter);
app.use("/dishes", dishRouter);
app.use("/counter", counterRouter);
app.use("/cart", cartRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

