import Sequelize from 'sequelize';

import User from '../app/models/User';
import Tasks from '../app/models/Tasks';

import databaseConfig from '../config/database';

const models = [User, Tasks];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection))
      .map((model) => {
        if (model.associate) model.associate(this.connection.models);
        return model;
      });
  }
}

export default new Database();
