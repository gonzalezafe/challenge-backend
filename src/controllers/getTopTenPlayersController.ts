import { Request, Response } from 'express';
import { getTopTenPlayersHelper } from '../services/helpers/getTopTenPlayersHelper';

export const getTopTenPlayersController = async (_req: Request, res: Response) => {
	try {
		const topTen = await getTopTenPlayersHelper();

		return res.status(200).json(topTen);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
