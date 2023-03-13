import { getRepository } from 'typeorm';
import { Dictionary } from '../../models/dictionary';
import cron from 'node-cron';
import { CurrentGame } from '../../models/CurrentGame';
import { User } from '../../models/User';

export const getRandomWordHelper = async () => {
	const sendRandomWord = async (): Promise<string> => {
		const words = await getRepository(Dictionary)
			.createQueryBuilder()
			.where('LENGTH(word) = :length', { length: 5 })
			.andWhere({ used: false })
			.getMany();
		// Seleccionar aleatoriamente una palabra del arreglo de palabras
		const randomWord = words[Math.floor(Math.random() * words.length)].word;

		const gameRepository = getRepository(CurrentGame);
		const userRepository = getRepository(User);

		// Reiniciar el contador de intentos para todos los usuarios
		const users = await userRepository.find();
		for (const user of users) {
			let currentGame = await gameRepository.findOne({ where: { user: user } });
			if (!currentGame) {
				currentGame = new CurrentGame();
				currentGame.user = user;
				currentGame.current_word = randomWord; // Asignar la palabra aleatoria generada al nuevo juego
				currentGame.attempts = 0;
			}
			currentGame.current_word = randomWord; // Actualizar la palabra aleatoria generada en el juego actual
			currentGame.attempts = 0;
			await gameRepository.save(currentGame);
		}
		await getRepository(Dictionary).update({ word: randomWord }, { used: true });
		return randomWord;
	};

	// Enviar la primera palabra y devolverla
	const randomWord = await sendRandomWord();

	// Programar el envío periódico de la palabra
	cron.schedule('*/5 * * * *', async () => {
		await sendRandomWord();
	});

	// Devolver la palabra aleatoria generada
	return { word: randomWord };
};
