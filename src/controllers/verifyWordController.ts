import { Request, Response } from 'express';
import { verifyWordHelper } from '../services/helpers/verifyWordHelper';

interface VerifyWordRequest {
	userWord: string;
	usernameGame: string;
}

export const verifyWordController = async (req: Request, res: Response) => {
	try {
		const { userWord, usernameGame }: VerifyWordRequest = req.body;
		const result = await verifyWordHelper(userWord, usernameGame);

		if ('errorGame' in result) {
			return res.status(400).json(result);
		}
		if ('message' in result) {
			return res.status(200).json(result);
		}

		return res.status(200).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
