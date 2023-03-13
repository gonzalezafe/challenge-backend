import express from 'express';
import { getTopTenPlayersController } from '../controllers/getTopTenPlayersController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/top-ten-players', authMiddleware, getTopTenPlayersController);

export default router;
