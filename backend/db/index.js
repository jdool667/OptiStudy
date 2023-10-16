const mongoose = require("mongoose");
require("dotenv").config();

// mongoose
// .connect(
//   `mongodb+srv://jackdarley:${process.env.MONGO_PASS}@cluster1.flx6zu9.mongodb.net/PlasticAway`
// )
// .then(() => console.log("db connected"))
// .catch((err) => console.log("db connection failed: ", err.message || err));

mongoose
  .connect(
    `mongodb+srv://jdev667:${process.env.MONGO_PASS}@cluster0.zv0v9b6.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection failed: ", err.message || err));
