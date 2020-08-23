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

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'users',
    });
  }
}

export default Tasks;
