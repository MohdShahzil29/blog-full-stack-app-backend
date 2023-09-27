const { hashPassword, comparePassword } = require("../helper/authHelper");
const userModels = require("../models/userModels");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");



const requireSign = jwt(
  { secret: process.env.JWT_SECRET, algorithms: ["HS256"] },
)


const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(500).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      res.status(500).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!password || password < 6) {
      res.status(500).send({
        success: false,
        message: "Name is required",
      });
    }

    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      res.status(500).send({
        success: false,
        message: "User Already has a an account",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModels({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "Account has been created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        success: "User email and password must for login",
      });
    }
    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User is not register",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid user and password",
      });
    }

    const Token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User Login successfully",
      Token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await userModels.findOne({ email });
    if (password && password.length < 6) {
      return res.status(500).send({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    // update user
    const updateUser = await userModels.findOneAndUpdate(
      { email },
      {
        name: name || user?.name,
        password: hashedPassword || user?.password,
      },
      { new: true }
    );

    updateUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "User has been updated",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update user API",
    });
  }
};

module.exports = { registerController, requireSign, loginController, updateUserController };
