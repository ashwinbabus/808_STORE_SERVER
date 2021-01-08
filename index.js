const express = require("express");
const app = express();
const cors = require("cors");
const cloudinary = require('cloudinary').v2;  

const PORT = process.env.PORT || 5000;

const products = require("./routes/product.routes");
const users = require("./routes/user.routes");
const payment = require("./routes/payment.routes");
const orders = require("./routes/order.routes");
const files = require("./routes/cloudinary.routes");
const address = require('./routes/address.routes');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoose = require("mongoose");

const SESS_LIFETIME = 1000 * 60 * 60 * 2;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded());

const uri =
  "mongodb+srv://808admin:admin*123@cluster0.8vvgc.mongodb.net/808?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

cloudinary.config({
  cloud_name : 'ashwin808',
  api_key: '615178783763635',
  api_secret: 'AJm1J6KfD_NVy0S1FR85GS6gX6g'
});

app.use(session({
  name: 'sid',
  secret: 'aadc41b1f50d1f4196f295bbcab5930ab24c525785868d14ac1c34e01c009854cd720d2da1742020a1a87b33a4f319ac7b383e611e07030f3e4ceaf91595ec74',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    ttl: parseInt(SESS_LIFETIME) / 1000,
  }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: true,
    secure: false,
    maxAge: parseInt(SESS_LIFETIME)
  }
}));


app.use("/products", products);
app.use("/users", users);
app.use("/payments", payment);
app.use("/orders",orders);
app.use("/files",files)
app.use("/address",address);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
