const Library = require("../models/Library");

// GET all libraries
const getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.status(200).json(libraries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch libraries" });
  }
};

// GET single library
const getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) return res.status(404).json({ message: "Library not found" });
    res.status(200).json(library);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch library" });
  }
};

// CREATE new library
const createLibrary = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const newLibrary = new Library({ name, location, description });
    const savedLibrary = await newLibrary.save();
    res.status(201).json(savedLibrary);
  } catch (err) {
    res.status(400).json({ message: "Failed to create library" });
  }
};

// UPDATE library
const updateLibrary = async (req, res) => {
  try {
    const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLibrary) return res.status(404).json({ message: "Library not found" });
    res.status(200).json(updatedLibrary);
  } catch (err) {
    res.status(400).json({ message: "Failed to update library" });
  }
};

// DELETE library
const deleteLibrary = async (req, res) => {
  try {
    const deletedLibrary = await Library.findByIdAndDelete(req.params.id);
    if (!deletedLibrary) return res.status(404).json({ message: "Library not found" });
    res.status(200).json({ message: "Library deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete library" });
  }
};


// @desc    Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: req.t("user.all_fetched"),
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: req.t("user.server_error") });
  }
};

module.exports = {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getAllUsers, 
};
