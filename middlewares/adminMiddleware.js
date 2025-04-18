const User = require('../models/user');

const checkAdmin = (req, res, next) => {
  console.log("🧑‍💼 User in checkAdmin:", req.user);           
  console.log("🛂 Is Admin?", req.user?.isAdmin?.());             

  if (!req.user || !req.user.isAdmin()) {
    return res.status(403).json({ status: 'fail', message: 'Access denied, admin only' });
  }
  next(); 
};

module.exports = checkAdmin;
