import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers';
import SessionController from './app/controllers/SessionController';
import TasksController from './app/controllers/TasksController';
import authMiddleware from './middlewares/auth';

const router = Router();

router.post('/users/login', SessionController.store);

router.post('/users/logon', UserControllers.store);
router.get('/users/:user_id/tasks', authMiddleware, TasksController.index);
router.post('/users/:user_id/tasks', authMiddleware, TasksController.store);
router.delete('/users/:user_id/tasks/:task_id', authMiddleware, TasksController.delete);
export default router;
