import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import configToken from '../../config/auth';

class SesisonController {
  async store(request, response) {
    const { nick_name, password } = request.body;


    const schema = Yup.object().shape({

      nick_name: Yup.string().required().required(),
      password: Yup.string().min(7).required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validations is Fails' });
    }

    const user = await User.findOne({ where: { nick_name } });

    if (!user) {
      return response.status(401).json({ error: 'NickName not exists' });
    }

    if (!(await user.verifyPassword(String(password)))) {
      return response.status(401).json({ error: 'Password not math' });
    }

    const { id, name, email } = user;

    return response.json({
      user: {
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
