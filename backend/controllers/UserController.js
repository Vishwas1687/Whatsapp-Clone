const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log(username, email);
    if (!username.length) {
      res.send({ status: "failed", message: "Enter username" });
      return;
    }

    if (!email.length) {
      res.send({ status: "failed", message: "Enter email" });
      return;
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.send({ status: "failed", message: "User not found" });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
      });
      res.send({
        token: token,
        user: {
          username: username,
          email: email,
        },
        status: "success",
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    res.send({
      status: "failed",
      message: "Unknown error",
      error: error.message,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username.length)
      res.send({ status: "failed", message: "Enter username" });
    if (!email.length) res.send({ status: "failed", message: "Enter email" });

    const user = UserModel.findOne({ email });
    if (user) {
      res.send({ status: "failed", message: "User already exists" });
    }
    new UserModel({
      name: username,
      email: email,
    }).save();
    res.send({ status: "success", message: "User successfully registered" });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Unknown error",
      error: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { username, about, image } = req.body;
  } catch {}
};

module.exports = {
  loginController,
  registerController,
  updateProfileController,
};
