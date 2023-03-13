import { Router } from 'express';
import { verifyWordController } from '../controllers/verifyWordController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/verify-word', authMiddleware, verifyWordController);

export default router;
