"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Tasks = require('../models/Tasks'); var _Tasks2 = _interopRequireDefault(_Tasks);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class CheckedController {
  async index(request, response) {
    const { user_id } = request.params;
    const id = user_id;

    if (!user_id) {
      return response.status(401).json({ error: 'user_id is required' });
    }

    const user = await _User2.default.findByPk(id);
    if (!user) {
      return response.status(401).json({ error: 'User not exists' });
    }

    const checkTask = await _Tasks2.default.findAll({ where: { check: true, user_id } });

    response.status(200).json(checkTask);
  }

  async update(request, response) {
    const { check } = request.body;

    const { task_id } = request.params;

    const schema = Yup.object().shape({

      check: Yup.boolean().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation is fails' });
    }

    if (!task_id) {
      return response.status(400).json({ error: 'Id is required' });
    }

    const existsTask = await _Tasks2.default.findByPk(task_id);

    if (!existsTask) {
      return response.status(401).json({ error: 'Task not exists' });
    }

    const updatedTask = await existsTask.update({ check });

    response.status(200).json(updatedTask);
  }
}

exports. default = new CheckedController();
