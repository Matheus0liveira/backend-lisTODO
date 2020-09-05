import * as Yup from 'yup';
import User from '../models/User';

class UserControllers {
  async index(request, response) {
    const users = await User.findAll();

    console.log(users);

    response.status(200).json(users);
  }

  async store(request, response) {

    const {
      name, nick_name, email, password,
    } = request.body;


    const schema = Yup.object().shape({

      name: Yup.string().required(),
      nick_name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().min(7).required(),

    });


    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validations is Fails' });
    }

    const existsEmail = await User.findOne({ where: { email } });

    const existsNickName = await User.findOne({ where: { nick_name } });

    if (existsEmail) {
      return response.status(400).json({ error: 'Email already existis!' });
    }

    if (existsNickName) {
      return response.status(400).json({ error: 'Nick Name already existis!' });
    }

    if (password.length <= 6) {
      return response.status(400).json({ error: 'Minimun 6 digit password requirement' });
    }

    await User.create({
      name,
      nick_name,
      email,
      password,
    });

    response.json({
      name,
      nick_name,
      email,
      password,
    });
  }
}

export default new UserControllers();
