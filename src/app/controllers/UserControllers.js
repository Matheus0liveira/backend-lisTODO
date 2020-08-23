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

    const user = await User.create({
      name,
      nick_name,
      email,
      password,
    });

    response.json(user);
  }

  async show(request, response) {
    const { nick_name, password } = request.body;

    if (!nick_name || !password) {
      return response.status(400).json({ error: 'Fill in all fields' });
    }

    const user = await User.findOne({ where: { nick_name } });

    console.log(user);
    if (!user) {
      return response.status(400).json({ error: 'NickName not exists' });
    }

    if (!(await user.checkPassword(String(password)))) {
      return response.status(400).json({ error: 'Password not math' });
    }

    return response.json({ ok: 'Logged' });
  }
}

export default new UserControllers();
