require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
     // Get token from the header
     const token = req.header('x-auth-token');

     // Check for token

     // If there's no token for a route that requires authorization, denies access
     if (!token) {
          // Unauthorized user
          return res
               .status(401)
               .json({ msg: 'No token, authorization denied' });
     }
     try {
          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          // Add user from payload
          req.album = decoded.album;

          next();
     } catch (err) {
          res.status(401).json({ msg: 'Token is not valid' });
     }
};
