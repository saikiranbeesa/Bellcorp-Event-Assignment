const jwt = require('jsonwebtoken');

// Middleware to protect routes - verifies JWT token and attaches user to request
const protect = async (req, res, next) => {
  let token;

  // Extract token from Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object for use in controllers
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

module.exports = protect;
