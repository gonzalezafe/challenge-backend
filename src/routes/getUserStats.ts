import { Router } from 'express';
import { getUserStatsController } from '../controllers/getUserStatsController';
import authMiddleware from '../middlewares/authMiddleware';
const router = Router();

router.get('/:username/stats', authMiddleware, getUserStatsController);

export default router;
