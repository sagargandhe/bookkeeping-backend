const express = require("express");
const router = express.Router();
const {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
} = require("../controllers/libraryController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getAllLibraries);
router.get("/:id", getLibraryById);
router.post("/", protect, createLibrary);
router.put("/:id", protect, updateLibrary);
router.delete("/:id", protect, deleteLibrary);

module.exports = router;
