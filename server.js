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


dotenv.config();
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(i18n.init); 
app.use(errorHandler);


app.get("/api/test", (req, res) => {
  res.json({ message: req.t("user_registered_success") });
});


app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/libraries", libraryRoutes);
app.get('/api/users/:id', (req, res) => {
 
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

