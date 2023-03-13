import { Request, Response } from 'express';
import { getUserStats } from '../services/helpers/getUserStats';

export const getUserStatsController = async (req: Request, res: Response) => {
	try {
		const { username } = req.params;

		console.log('params', username);
		const result = await getUserStats(username);

		return res.status(200).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
