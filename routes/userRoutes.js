const express = require("express");
const router = express.Router();
const checkAdmin = require('../middlewares/adminMiddleware');

// ✅ User Controller Functions
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

// ✅ Borrow Controller Functions
// ✅ Updated
const { borrowBook, returnBook } = require("../controllers/borrowController");

// ✅ Middleware
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const restrictToAdmin = require("../middlewares/restrictToAdmin");

// ✅ Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// ✅ Admin-Only Routes
router.get("/admin-profile", protect, authorizeRoles("admin"), getUserProfile);
router.delete("/user/:id", protect, restrictToAdmin, deleteUser);
router.get("/", protect, restrictToAdmin, getAllUsers);

// ✅ Borrow Book Route
router.post("/borrow", protect, borrowBook);
router.post("/return", protect, returnBook);

module.exports = router;
