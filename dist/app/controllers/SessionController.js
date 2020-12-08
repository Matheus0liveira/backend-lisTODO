"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

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

    const user = await _User2.default.findOne({ where: { nick_name } });

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
      token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
        expiresIn: _auth2.default.expirisIn,
      }),
    });
  }
}

exports. default = new SesisonController();
