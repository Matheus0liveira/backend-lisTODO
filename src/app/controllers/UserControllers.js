import User from '../models/User';

class UserControllers {
  async index(request, response) {
    const users = await User.findAll();

    return response.json(users);
  }

  // Cria um único usuário
  async store(request, response) {
    const {
      name, nick_name, email, password,
    } = request.body;

    if (!name || !nick_name || !email || !password) {
      return response.status(400).json({ error: 'Fill in all fields' });
    }

    const existsEmail = await User.findOne({ where: { email } });
    const existsNickName = await User.findOne({ where: { nick_name } });
    console.log({ existsEmail, existsNickName });

    if (existsEmail) {
      return response.status(400).json({ error: 'Email already existis!' });
    }

    if (existsNickName) {
      return response.status(400).json({ error: 'Nick Name already existis!' });
    }

    if (password.length <= 4) {
      return response.status(400).json({ error: 'Minimun 4 digit password requirement' });
    }

    const user = await User.create({
      name,
      nick_name,
      email,
      password,
    });

    response.json(user);
  }
}

export default new UserControllers();
