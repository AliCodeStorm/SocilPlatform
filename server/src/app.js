const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware=require("./middlewares/error.middleware");
const cors=require("cors");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const authRoutes=require("./routes/auth.routes");
const userRoutes=require("./routes/user.routes");

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

app.use(errorMiddleware);

module.exports = app; 