const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, 'zeynep');
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {verifyJWT};