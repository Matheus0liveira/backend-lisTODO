import Tasks from '../models/Tasks';

class CheckedController {
  async update(request, response) {
    const { task_id } = request.params;

    if (!task_id) {
      return response.status(400).json({ error: 'Id required' });
    }

    const existsTask = await Tasks.findByPk(task_id);

    if (!existsTask) {
      return response.status(401).json({ error: 'Task not exists' });
    }

    const updatedTask = await existsTask.update({ check: true });

    response.status(200).json(updatedTask);
  }
}

export default new CheckedController();
