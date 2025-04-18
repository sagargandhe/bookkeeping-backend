const express = require("express");
const router = express.Router();
const checkAdmin = require('../middlewares/adminMiddleware');

// Controller Functions
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const { borrowBook, returnBook } = require("../controllers/borrowController");

// Middleware
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const restrictToAdmin = require("../middlewares/restrictToAdmin");

//  Mongoose Model
const User = require("../models/user");

//  Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//  Protected Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

//  Admin-Only Routes
router.get("/admin-profile", protect, authorizeRoles("admin"), getUserProfile);
router.delete("/user/:id", protect, restrictToAdmin, deleteUser);
router.get("/", protect, restrictToAdmin, getAllUsers);


router.get("/user/:id", protect, restrictToAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("❌ Error:", err.message); 
    res.status(500).json({ message: err.message });
  }
});


router.post("/borrow", protect, borrowBook);
router.post("/return", protect, returnBook);

module.exports = router;
