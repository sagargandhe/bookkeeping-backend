const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary"); // ✅ sahi path

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // 👈 yahi error aa raha tha
  params: {
    folder: "book-covers",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 750, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = { upload };
