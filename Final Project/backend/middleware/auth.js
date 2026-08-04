const { admin, isInitialized } = require('../config/firebase');

const verifyAuth = async (req, res, next) => {
  if (!isInitialized) {
    return res.status(500).json({ error: 'Firebase is not initialized on the server.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    
    // Check if the user is the admin — sets req.isAdmin for downstream route guards
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'yashdate31@gmail.com'; 
    req.isAdmin = decodedToken.email === ADMIN_EMAIL;

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = verifyAuth;
