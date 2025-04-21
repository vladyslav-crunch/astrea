import { Router } from 'express';
import { loginUser, registerUser, refreshToken } from '../controllers/auth.controller';

const router = Router();

router.post('/refresh', refreshToken);
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
