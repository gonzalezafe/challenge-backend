import { Request, Response } from 'express';
import { getMostGuessedWordsHelper } from '../services/helpers/getMostGuessedWordsHelper';

export const getMostGuessedWordsController = async (_req: Request, res: Response) => {
	try {
		const mostGuessedWords = await getMostGuessedWordsHelper();

		return res.status(200).json(mostGuessedWords);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
