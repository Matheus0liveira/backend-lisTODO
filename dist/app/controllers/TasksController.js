"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Tasks = require('../models/Tasks'); var _Tasks2 = _interopRequireDefault(_Tasks);

class TasksController {
  async index(request, response) {
    const { userId } = request;

    const tasks = await _Tasks2.default.findAll({ where: { user_id: userId } });

    return response.status(200).json(tasks);
  }

  async store(request, response) {
    const { user_id } = request.params;
    const {
      title, description, priority,
    } = request.body;

    const schema = Yup.object().shape({

      title: Yup.string().required(),
      description: Yup.string().required(),
      priority: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validations is Fails' });
    }

    const user = await _User2.default.findByPk(user_id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    const task = await _Tasks2.default.create({
      title, description, priority, user_id,
    });

    response.status(200).json(task);
  }

  async delete(request, response) {
    const { user_id, task_id } = request.params;

    if (!user_id || !task_id) {
      return response.status(401).json({ error: 'User not permission' });
    }

    const existsUser = await _User2.default.findByPk(user_id);
    const existsTask = await _Tasks2.default.findByPk(task_id);

    if (!existsUser) {
      return response.status(401).json({ error: 'User not exists' });
    }

    if (!existsTask) {
      return response.status(401).json({ error: 'Task not exists' });
    }

    const verifyUserId = existsTask.user_id;

    const existsUserIdbyTask = _Tasks2.default.findOne({ where: { user_id: verifyUserId } });

    if (!existsUserIdbyTask) {
      return response.status(401).json({ error: 'User not authorization' });
    }

    await _Tasks2.default.destroy({ where: { id: task_id } });

    response.sendStatus(200);
  }
}
exports. default = new TasksController();
