import User from '../models/User';

class UserControllers {
  async store(request, response) {
    const {

      name, nick_name, email, password,
    } = request.body;

    if (!name || !nick_name || !email || !password) {
      return response.status(400).json({ error: 'Fill in all fields' });
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
