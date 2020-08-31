import { Model, DataTypes } from 'sequelize';

class Tasks extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        priority: DataTypes.STRING,
        check: DataTypes.BOOLEAN,
        user_id: DataTypes.INTEGER,

      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Tasks;
