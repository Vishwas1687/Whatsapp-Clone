//mongodb+srv://gpvishwas1687:Gpvishwas20@@cluster0.nlmfe.mongodb.net/
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/UserRoutes.js");

dotenv.config();

const connect = mongoose.connect(process.env.MONGO_URL);

connect.then(
  () => {
    console.log("Connected correctly to the server");
  },
  (err) => {
    console.log(err);
  }
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user/", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
