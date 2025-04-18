const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("Registering User: ", { name, email, role });

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: req.t("user.already_exists") });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: req.t("user.registered_success"),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    console.error("Registration Error: ", err.message);
    res.status(500).json({ message: req.t("user.registration_failed"), error: err.message });
  }
};



const getAllUsers = async (req, res) => {
  if (!req.user.isAdmin()) {
    return res.status(403).json({ status: 'fail', message: 'Access denied, admin only' });
  }

  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt with Email: ", email);

    const user = await User.findOne({ email });
    console.log("Found User: ", user);

    if (!user) {
      return res.status(401).json({ message: req.t("user.invalid_credentials") });
    }

    const isMatch = await user.comparePassword(password);
    console.log("Password Match: ", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: req.t("user.invalid_credentials") });
    }

    res.json({
      message: req.t("user.login_success"),
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login Error: ", err.message);
    res.status(500).json({ message: req.t("user.login_failed"), error: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: req.t("user.not_found") });
    }

    res.json({
      message: req.t("user.profile_fetched"),
      user,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ message: req.t("user.server_error") });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: req.t("user.not_found") });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; 
    }

    const updatedUser = await user.save();

    res.json({
      message: req.t("user.profile_updated"),
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: req.t("user.profile_update_failed") });
  }
};

const adminUpdateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: req.t("user.not_found") });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      message: req.t("user.profile_updated"),
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).json({ message: req.t("user.profile_update_failed") });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: req.t("user.not_found") });
    }

    await user.deleteOne();

    res.json({ message: req.t("user.deleted_success") });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: req.t("user.delete_failed") });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  adminUpdateUserProfile, 
  deleteUser,
  getAllUsers,
  
};
