import { Router } from 'express';
import UserControllers from './app/controllers/UserControllers';

const router = Router();

router.get('/users', UserControllers.index);
router.post('/users', UserControllers.store);
router.post('/users/login', UserControllers.show);

export default router;
