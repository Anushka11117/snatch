const express = require("express");
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const jwt = require('jsonwebtoken');
 require("dotenv").config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session(
  {  resave: false,
     saveUninitialized: false,
     secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  }
))

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.use('/' , indexRouter)
app.use("/owner", ownersRouter);
app.use("/user", usersRouter);
app.use("/product", productsRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));