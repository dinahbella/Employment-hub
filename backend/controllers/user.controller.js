import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    //  chect if role is correct or not
    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skils } = req.body;
    if (!fullname || !email || !phoneNumber || !bio || !skils) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const skillsArray = skils.split(",");
    const userId = req.id;
    let user = await User.findById(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.name = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skils = skillsArray;

    //  resume
    await user.save();

    user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
