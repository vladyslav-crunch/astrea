import {Router} from 'express';
import {loginUser, createUser, refreshToken, logout} from '../controllers/auth.controller';

const router = Router();

router.post('/refresh', refreshToken);
router.post('/sign-in', loginUser);
router.post('/sign-up', createUser);
router.post('/log-out', logout);

export default router;
