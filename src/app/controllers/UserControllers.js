import UserRepository from '../../repositories/UserRepository';
import encrypt from '../../utils/encrypt';

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

    const password_hash = await encrypt(password);

    await UserRepository.create({
      name, nick_name, email, password, password_hash,
    });

    response.json({ message: 'Created User' });
  }
}

export default new UserControllers();
