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
    const { userId } = request;
    console.log({ user_id, userId });

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    const task = await Tasks.create({
      title, description, priority, user_id,
    });

    response.json(task);
  }
}
export default new TasksController();
