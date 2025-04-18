const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const protect = async (req, res, next) => {
  let token;

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'You are not authorized, no token provided.' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed.' });
  }
};


const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
