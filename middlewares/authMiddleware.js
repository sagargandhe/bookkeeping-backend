const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Make sure this is the correct path

// ✅ Protect middleware: Checks JWT token and attaches user to req
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, deny access
  if (!token) {
    return res.status(401).json({ message: 'You are not authorized, no token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch full Mongoose document to keep instance methods like isAdmin()
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // Attach user to request
    next(); // Go to next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};

// ✅ Role-based access middleware
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
