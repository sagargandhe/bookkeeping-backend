const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

//  REGISTER USER
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user'; 

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: req.t('user.already_exists') });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: req.t('user.registered_success'),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: req.t('server.error'), error: err.message });
  }
};

// ✅LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: req.t('user.invalid_credentials') });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: req.t('user.invalid_credentials') });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: req.t('user.login_success'),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: req.t('server.error'), error: err.message });
  }
};
