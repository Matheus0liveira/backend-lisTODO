"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserControllers {
  async index(request, response) {
    const users = await _User2.default.findAll();

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

    const existsEmail = await _User2.default.findOne({ where: { email } });

    const existsNickName = await _User2.default.findOne({ where: { nick_name } });

    if (existsEmail) {
      return response.status(400).json({ error: 'Email already existis!' });
    }

    if (existsNickName) {
      return response.status(400).json({ error: 'Nick Name already existis!' });
    }

    if (password.length <= 6) {
      return response.status(400).json({ error: 'Minimun 6 digit password requirement' });
    }

    await _User2.default.create({
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

exports. default = new UserControllers();
