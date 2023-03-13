import { getRepository } from 'typeorm';
import { GameResult } from '../../models/GameResult';
export const getMostGuessedWordsHelper = async (): Promise<
	{ word: string; count: number }[]
> => {
	const gameResultRepository = getRepository(GameResult);

	return await gameResultRepository
		.createQueryBuilder('gameResult')
		.select('gameResult.word as word, COUNT(gameResult.word) as count')
		.groupBy('gameResult.word')
		.orderBy('count', 'DESC')
		.limit(10)
		.getRawMany();
};
