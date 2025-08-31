import User from "../model/User12.js";
import { comparePassword, hashaedpassword } from "../helpers/AuthHelpers.js";
import { uservalidator } from "../validators/Validators.js";
import { genertetoken } from "../helpers/jwtHelper.js";
import ProductUser from "../model/Product.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    await uservalidator.validate(req.body);
    const emailexit = await User.findOne({ email });
    if (emailexit) {
      res.status(400).send({
        message: "email already is registered",
        success: false,
      });
    }
    const hashpassword = await hashaedpassword(password);

    const user = new User({
      name,
      email,
      password: hashpassword,
      role: role || "entrepreneur",
    });
    await user.save();
    res.status(201).send({
      message: "User is registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message || "Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email or password is missing",
        success: false,
      });
    }

    const existemail = await User.findOne({ email });
    if (!existemail) {
      return res.status(404).send({
        message: "Email does not exist. Please register first.",
        success: false,
      });
    }

    const matched = await comparePassword(password, existemail.password);
    if (!matched) {
      return res.status(401).send({
        message: "Invalid password",
        success: false,
      });
    }

    const token = genertetoken(existemail);

    res.status(200).send({
      message: "Login successful",
      success: true,
      user: {
        id: existemail._id,
        firstname: existemail.name,
        email: existemail.email,
        role: existemail.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const profileview = async (req, res) => {
  try {
    const { id } = req.params; // URL params se id lena

    // Agar _id se search karni hai
    const data = await User.findById(id);

    if (!data) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "ID is successfully fetched",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // get updated fields from request body
    if (updateData.password && updateData.password.trim()!=="") {
      updateData.password = await hashaedpassword(updateData.password);
    }
    if (req.file) {
      updateData.image = req.file.path; // multer path deta hai (uploads/xyz.jpg)
    }
    const data = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!data) {
      return res.status(404).send({
        message: "ID not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Data updated successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      success: false,
    });
  }
};
