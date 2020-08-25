import jwt from 'jsonwebtoken';
import configToken from '../config/auth';

async function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;
  const { user_id } = request.params;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provider' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, configToken.secret);

    const userId = decodedToken.id;

    request.userId = String(userId);

    if (user_id !== String(userId)) {
      return response.status(401).json({ error: 'User not authentication' });
    }

    next();
  } catch (e) {
    return response.status(401).json({ error: 'Unauthorized' });
  }
}

export default authMiddleware;
