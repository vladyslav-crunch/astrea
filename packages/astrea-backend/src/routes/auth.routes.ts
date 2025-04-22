import {Router} from 'express';
import {loginUser, createUser, refreshToken} from '../controllers/auth.controller';

const router = Router();

router.post('/refresh', refreshToken);
router.post('/sign-in', loginUser);
router.post('/sign-up', createUser);

export default router;
