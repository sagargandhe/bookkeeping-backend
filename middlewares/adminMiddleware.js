// adminMiddleware.js
const User = require('../models/user');

const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin()) {
    return res.status(403).json({ status: 'fail', message: 'Access denied, admin only' });
  }
  next(); // Allow the request to proceed to the next handler
};

module.exports = checkAdmin;
