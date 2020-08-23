import UserRepository from '../../repositories/UserRepository';
import encryptPassword from '../../utils/encryptPassword';
import checkPassword from '../../utils/checkPassword';

class UserControllers {
  async index(request, response) {
    const users = await UserRepository.findAll();

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

    const existsEmail = await UserRepository.findByEmail(email);
    const existsNickName = await UserRepository.findByNickName(nick_name);

    if (existsEmail) {
      return response.status(400).json({ error: 'Email already existis!' });
    }

    if (existsNickName) {
      return response.status(400).json({ error: 'Nick Name already existis!' });
    }

    const password_hash = await encryptPassword(password);

    await UserRepository.create({
      name, nick_name, email, password_hash,
    });

    response.json({ message: 'Created User' });
  }

  async show(request, response) {
    const { nick_name, password } = request.body;

    if (!nick_name || !password) {
      return response.status(400).json({ error: 'Fill in all fields' });
    }

    const existsNickName = await UserRepository.findByNickName(nick_name);
    if (!existsNickName) {
      return response.status(400).json({ error: 'NickName not exists' });
    }

    const encryptPasswordPassword = existsNickName.password;

    const compare = await checkPassword(String(password), String(encryptPasswordPassword));
    if (!compare) {
      return response.status(400).json({ error: 'Password not math' });
    }

    response.json({ ok: 'Logged' });
  }
}

export default new UserControllers();
