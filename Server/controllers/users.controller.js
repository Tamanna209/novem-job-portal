const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const socialLoginRegister = async (req, res) => {
  try {
    const { social_id, name, email, reg_id, device_id, user_type, location } =
      req.body;

    let user = await User.findOne({ social_id });

    let is_new_user = false;
    if (!user) {
      // Generate unique app_id for new user using UUID
      const newAppId = uuidv4();

      user = new User({
        social_id,
        name,
        email,
        reg_id,
        device_id,
        user_type,
        location,
        app_id: newAppId,
      });
      await user.save();
      is_new_user = true;
    } else {
      // Update fields if needed
      user.name = name || user.name;
      user.email = email || user.email;
      user.reg_id = reg_id || user.reg_id;
      user.device_id = device_id || user.device_id;
      user.user_type = user_type || user.user_type;
      user.location = location || user.location;
      user.updatedAt = new Date();
      await user.save();
    }

    const auth_token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );
    const login_time = new Date().toISOString().slice(0, 19).replace("T", " ");

    res.status(200).json({
      status: "1",
      message: "User has been social login successfully",
      details: {
        id: user._id.toString(),
        app_id: user.app_id,
        user_type: user.user_type,
        is_new_user,
        token_data: {
          auth_token,
          userId: user._id.toString(),
          login_time,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
       status: "0",
        message: "Internal server error" 
      });
  }
};

const userNumberLoginRegister = async (req, res) => {
  try {
    const { number, reg_id, device_id, location, user_type } = req.body;

    if (!number) {
      return res.status(200).json({
        status: "0",
        message: "Phone number is required",
      });
    }

    let user = await User.findOne({ number });

    let is_new_user = false;
    if (!user) {
      const newAppId = uuidv4();

      user = new User({
        number,
        reg_id,
        device_id,
        location,
        user_type,
        app_id: newAppId,
      });
      is_new_user = true;
    } else {
      // Update fields if needed
      user.reg_id = reg_id || user.reg_id;
      user.device_id = device_id || user.device_id;
      user.location = location || user.location;
      user.user_type = user_type || user.user_type;
      user.updatedAt = new Date();
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;

    await user.save();

    res.status(200).json({
      status: "1",
      message: "User logged in successfully",
      otp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "0",
      message: "Internal server error",
    });
  }
};

const userOtpVerify = async (req, res) => {
  try {
    const { number, otp } = req.body;

    if (!number || !otp) {
      return res.status(200).json({
        status: "error",
        message: "Phone number and OTP are required",
      });
    }

    const user = await User.findOne({ number });

    if (!user) {
      return res.status(200).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(200).json({
        status: "error",
        message: "Invalid OTP",
      });
    }

    // Clear OTP after successful verification
    user.otp = null;
    await user.save();

    const auth_token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      app_id: user.app_id,
      user_type: user.user_type,
      is_new_user: false, // Assuming verification is for existing users
      auth_token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { socialLoginRegister, userNumberLoginRegister, userOtpVerify };
