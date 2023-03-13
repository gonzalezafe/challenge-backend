import { getRepository } from 'typeorm';
import { GameResult } from '../../models/GameResult';

export const getTopTenPlayersHelper = async () => {
	const gameRepository = getRepository(GameResult);
	const qb = gameRepository
		.createQueryBuilder('gameResult')
		.select('gameResult.user', 'user')
		.addSelect('COUNT(gameResult.id)', 'victories')
		.where('gameResult.success = :success', { success: true })
		.groupBy('gameResult.user')
		.orderBy('victories', 'DESC')
		.limit(10);

	const topTen = await qb.getRawMany();
	return topTen;
};
