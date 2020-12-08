"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Tasks extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize.DataTypes.STRING,
        description: _sequelize.DataTypes.STRING,
        priority: _sequelize.DataTypes.STRING,
        check: _sequelize.DataTypes.BOOLEAN,
        user_id: _sequelize.DataTypes.INTEGER,

      },
      {
        sequelize,
      },
    );

    return this;
  }
}

exports. default = Tasks;
