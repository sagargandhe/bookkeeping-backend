const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const i18n = require("./config/i18n");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Config & DB
dotenv.config();
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(i18n.init); // Load i18n before routes
app.use(errorHandler);

// Optional test route to confirm language change
app.get("/api/test", (req, res) => {
  res.json({ message: req.t("user_registered_success") });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/libraries", libraryRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

