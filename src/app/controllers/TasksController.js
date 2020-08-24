import User from '../models/User';
import Tasks from '../models/Tasks';

class TasksController {
  async store(request, response) {
    const { user_id } = request.params;
    const {
      title, description, priority,
    } = request.body;
    const { userId } = request;
    console.log({ user_id, userId });
    if (user_id !== userId) {
      return response.status(401).json({ error: 'User not authentication' });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(401).json({ error: 'user not found' });
    }

    const task = await Tasks.create({
      title, description, priority, user_id,
    });
    // console.log(userId);

    response.json(task);
  }
}
export default new TasksController();
