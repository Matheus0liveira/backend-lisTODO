import jwt from 'jsonwebtoken';
import User from '../models/User';
import configToken from '../../config/auth';

class SesisonController {
  async store(request, response) {
    const { nick_name, password } = request.body;

    if (!nick_name || !password) {
      return response.status(401).json({ error: 'Fill in all fields' });
    }

    const user = await User.findOne({ where: { nick_name } });

    if (!user) {
      return response.status(401).json({ error: 'NickName not exists' });
    }

    if (!(await user.checkPassword(String(password)))) {
      return response.status(401).json({ error: 'Password not math' });
    }

    const { id, name, email } = user;

    return response.json({
      User: {
        id,
        name,
        nick_name,
        email,
      },
      token: jwt.sign({ id }, configToken.secret, {
        expiresIn: configToken.expirisIn,
      }),
    });
  }
}

export default new SesisonController();
