import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers';
import SessionController from './app/controllers/SessionController';
import TasksController from './app/controllers/TasksController';
import authMiddleware from './middlewares/auth';

const router = Router();

router.get('/users', UserControllers.index);
router.post('/users/logon', UserControllers.store);
router.post('/users/login', SessionController.store);
router.use(authMiddleware);
router.post('/users/:user_id/tasks', TasksController.store);
export default router;
