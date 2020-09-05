import Tasks from '../models/Tasks';
import User from '../models/User';
import * as Yup from 'yup';

class CheckedController {
  async index(request, response) {
    const { user_id } = request.params;
    const id = user_id;


    if (!user_id) {
      return response.status(401).json({ error: 'user_id is required' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return response.status(401).json({ error: 'User not exists' });
    }

    const checkTask = await Tasks.findAll({ where: { check: true, user_id } });

    response.status(200).json(checkTask);
  }

  async update(request, response) {
    const { check } = request.body;

    const { task_id } = request.params;

    const schema = Yup.object().shape({

      check: Yup.boolean().required()
    });


    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validation is fails' });
    }

    if (!task_id) {
      return response.status(400).json({ error: 'Id is required' });
    }


    const existsTask = await Tasks.findByPk(task_id);


    if (!existsTask) {
      return response.status(401).json({ error: 'Task not exists' });
    }


    const updatedTask = await existsTask.update({ check: check });

    response.status(200).json(updatedTask);
  }
}

export default new CheckedController();
