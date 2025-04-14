const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// 👇 Add this line
const checkAdmin = require("../middlewares/adminMiddleware");

// Book controller functions
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  returnBook,
} = require("../controllers/bookController");

// Routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/createBook", checkAdmin, createBook); // ✅ Fixed
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);
router.post("/:id/return", protect, returnBook);

module.exports = router;
