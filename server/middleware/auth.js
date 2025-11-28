const jwt = require("jsonwebtoken");
const { User } = require("../models");
const JWT_SECRET = process.env.JWT_SECRET || 'secret8';
// server/middleware/auth.js
'use strict';

/**
 * Simple auth middleware:
 * - verifies Bearer token
 * - finds user in DB (excludes password)
 * - attaches safe user object to req.user
 * - returns 401 on missing/invalid token or if user not found
 */
module.exports = async function (req, res, next) {
  const header = req.headers.authorization || '';

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed Authorization header' });
  }

  const token = header.split(' ')[1];

  try {
    // verify token (throws if invalid/expired)
    const payload = jwt.verify(token, JWT_SECRET);

    // payload should contain user id (common: { id, username, role } or sub)
    const userId = payload.id || payload.sub;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // fetch user from DB and exclude password
    const userDoc = await User.findById(userId).select('-password -__v').lean();
    if (!userDoc) {
      return res.status(401).json({ message: 'User not found' });
    }

    // attach a safe user object (string id)
    req.user = {
      id: userDoc._id.toString(),
      username: userDoc.username,
      role: userDoc.role,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    };

    return next();
  } catch (err) {
    // jwt.verify throws on invalid/expired token; treat as 401
    // any other unexpected error also handled here
    console.warn('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
