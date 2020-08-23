import { v4 } from 'uuid';
import users from '../mock/users';

class UserRepository {
  findAll() {
    return new Promise((resolve) => resolve(users));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.email === email),
    ));
  }

  findByNickName(nick_name) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.nick_name === nick_name),
    ));
  }

  create({
    name, nick_name, email, password_hash,
  }) {
    return new Promise((resolve) => {
      const newUser = {
        id: v4(),
        name,
        nick_name,
        email,
        password: password_hash,
      };
      users.push(newUser);
      resolve(newUser);
    });
  }
}

export default new UserRepository();
