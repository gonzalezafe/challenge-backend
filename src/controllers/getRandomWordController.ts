import { Request, Response } from 'express';
import { getRandomWordHelper } from '../services/helpers/getRandomWordHelper';

export const getRandomWordController = async (_req: Request, res: Response) => {
	try {
		const resultRandomWord = await getRandomWordHelper();

		return res.status(200).json(resultRandomWord);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error al obtener la palabra random' });
	}
};
