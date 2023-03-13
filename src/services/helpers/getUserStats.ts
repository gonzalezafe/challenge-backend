import { getRepository } from 'typeorm';
import { GameResult } from '../../models/GameResult';

export const getUserStats = async (username: string) => {
	const gameRepository = getRepository(GameResult);

	const userGames = await gameRepository.find({ where: { user: username } });

	const userResults = {
		games: userGames.length,
		victories: userGames.filter((g) => g.success === true).length,
	};

	return userResults;
};
