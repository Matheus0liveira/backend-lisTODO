"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.DataTypes.STRING,
        nick_name: _sequelize.DataTypes.STRING,
        email: _sequelize.DataTypes.STRING,
        password: _sequelize.DataTypes.VIRTUAL,
        password_hash: _sequelize.DataTypes.STRING,

      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 10);
      }
    });
    return this;
  }

  verifyPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = User;
