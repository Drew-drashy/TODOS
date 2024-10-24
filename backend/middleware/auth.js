const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token not found or invalid format' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part
//   console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
