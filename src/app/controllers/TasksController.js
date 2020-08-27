import User from '../models/User';
import Tasks from '../models/Tasks';

class TasksController {
  async index(request, response) {
    const { userId } = request;
    const { user_id } = request.params;

    console.log({ userId, user_id });

    const tasks = await Tasks.findAll({ where: { user_id: userId } });

    return response.status(200).json(tasks);
  }

  async store(request, response) {
    const { user_id } = request.params;
    const {
      title, description, priority,
    } = request.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    const task = await Tasks.create({
      title, description, priority, user_id,
    });

    response.json(task);
  }

  async delete(request, response) {
    const { user_id, task_id } = request.params;

    if (!user_id || !task_id) {
      return response.status(401).json({ error: 'User not permission' });
    }

    const existsUser = await User.findByPk(user_id);

    const existsTask = await Tasks.findByPk(task_id);

    if (!existsUser) {
      return response.status(401).json({ error: 'User not exists' });
    }

    if (!existsTask) {
      return response.status(401).json({ error: 'Task not exists' });
    }

    const verifyUserId = existsTask.user_id;

    const existsUserIdbyTask = Tasks.findOne({ where: { user_id: verifyUserId } });

    if (!existsUserIdbyTask) {
      return response.status(401).json({ error: 'User not authorization' });
    }

    await Tasks.destroy({ where: { id: task_id } });

    response.sendStatus(200);
  }
}
export default new TasksController();
