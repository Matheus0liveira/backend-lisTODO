import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers';
import SessionController from './app/controllers/SessionController';

const router = Router();

router.get('/users', UserControllers.index);
router.post('/users/logon', UserControllers.store);
router.post('/users/login', SessionController.store);

export default router;
