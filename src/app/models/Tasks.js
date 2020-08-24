import Sequelize, { Model } from 'sequelize';

class Tasks extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        priorty: Sequelize.STRING,
        user_id: Sequelize.INTEGER,

      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Tasks;
