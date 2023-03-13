import { getRepository } from 'typeorm';
import { CurrentGame } from '../../models/CurrentGame';
import { GameResult } from '../../models/GameResult';
import { User } from '../../models/User';

export const verifyWordHelper = async (userWord: string, usernameGame: string) => {
	const resultCheck: { letter: string; value: number }[] = [];

	// Buscar el objeto CurrentGame correspondiente al usuario y palabra actual en la base de datos
	const gameRepository = getRepository(CurrentGame);
	const currentGame = await gameRepository.findOne({
		where: { user: { username: usernameGame } },
	});

	if (!currentGame) {
		return { errorGame: 'No se encontró el juego actual' };
	}

	let success = false;

	for (let i = 0; i < userWord.length; i++) {
		if (userWord[i] === currentGame.current_word[i]) {
			resultCheck.push({ letter: userWord[i], value: 1 });
		} else if (currentGame.current_word.includes(userWord[i])) {
			resultCheck.push({ letter: userWord[i], value: 2 });
		} else {
			resultCheck.push({ letter: userWord[i], value: 3 });
		}
	}

	if (resultCheck.every((r) => r.value === 1)) {
		success = true;
	}

	if (success || currentGame.attempts >= 5) {
		const message = success
			? 'Palabra correcta'
			: 'Ya has alcanzado el límite de 5 intentos.';
		const gameResult = new GameResult();
		gameResult.user = usernameGame;
		gameResult.word = userWord;
		gameResult.attempts = currentGame.attempts;
		gameResult.success = success;
		gameResult.createdAt = new Date();
		const gameResultRepository = getRepository(GameResult);
		await Promise.all([
			gameRepository.save(currentGame),
			gameResultRepository.save(gameResult),
		]);
		return { message };
	}

	currentGame.attempts++;
	await gameRepository.save(currentGame);
	console.log('currentGame', currentGame.attempts);

	return { result: resultCheck };
};
