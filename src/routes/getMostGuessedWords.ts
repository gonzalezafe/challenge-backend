import express from 'express';
import { getMostGuessedWordsController } from '../controllers/getMostGuessedWordsController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/most-guessed-words', authMiddleware, getMostGuessedWordsController);

export default router;
