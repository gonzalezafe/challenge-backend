import { Router } from 'express';
import { getRandomWordController } from '../controllers/getRandomWordController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/random-word', authMiddleware, getRandomWordController);

export default router;
