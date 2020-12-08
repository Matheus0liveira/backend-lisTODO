"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _auth = require('../config/auth'); var _auth2 = _interopRequireDefault(_auth);

async function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;
  const { user_id } = request.params;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provider' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { id } = _jsonwebtoken2.default.verify(token, _auth2.default.secret);

    const userId = id;

    request.userId = String(userId);

    if (user_id !== String(userId)) {
      return response.status(401).json({ error: 'User not authentication' });
    }

    next();
  } catch (e) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
}

exports. default = authMiddleware;
