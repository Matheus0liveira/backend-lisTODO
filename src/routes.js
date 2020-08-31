import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers';
import SessionController from './app/controllers/SessionController';
import TasksController from './app/controllers/TasksController';
import CheckedController from './app/controllers/CheckedController';
import authMiddleware from './middlewares/auth';

const router = Router();

// Session route
router.post('/users/signin', SessionController.store);

// User route
router.post('/users/signup', UserControllers.store);
router.get('/users', UserControllers.index);

// Tasks routes
router.get('/users/:user_id/tasks', authMiddleware, TasksController.index);
router.post('/users/:user_id/tasks', authMiddleware, TasksController.store);
router.delete('/users/:user_id/tasks/:task_id', authMiddleware, TasksController.delete);

// Checked route

router.put('/users/:user_id/tasks/:task_id', authMiddleware, CheckedController.update);

export default router;
