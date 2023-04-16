const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
console.log('JWT works')

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
        
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
        
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)
      // Get user from the token
    //   req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      res.json({
        "error": true,
        "message": "Not authorized, no token"
    });
      // throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    res.json({
      "error": true,
      "message": "Not authorized, no token"
  });
    // throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }