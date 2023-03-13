import request from 'supertest';
import app from '../index';
import { getConnection, getRepository, In } from 'typeorm';
import { Dictionary } from '../models/dictionary';
import { User } from '../models/User';
import ServiceDb from '../config/database';
import { CurrentGame } from '../models/CurrentGame';

describe('getRandomWordController', () => {
	const words = [
		{ word: 'hello', used: false },
		{ word: 'world', used: false },
		{ word: 'apple', used: false },
		{ word: 'banana', used: true },
	];
	beforeEach(async () => {
		// Se asegura que la base de datos está limpia antes de cada prueba
		await ServiceDb();
		const conn = getConnection();
		await conn.synchronize(true);
	});

	afterEach(async () => {
		// Eliminar los datos creados durante la prueba
		const userRepository = getRepository(User);
		const findUserRepository = await userRepository.find({
			where: { username: In(['user1', 'user2']) },
		});
		// Obtener los juegos de los usuarios encontrados y borrarlos
		const userGameIds = findUserRepository.map((user) => user.id);
		const currentGameRepository = getRepository(CurrentGame);
		await currentGameRepository.delete({ userId: In(userGameIds) });
		await userRepository.delete(findUserRepository.map((user) => user.id));

		// Eliminar las palabras agregadas a la base de datos después de la prueba
		const wordsToDelete = words.map((word) => word.word);
		const dictionaryRepository = getRepository(Dictionary);
		await dictionaryRepository
			.createQueryBuilder()
			.delete()
			.from(Dictionary)
			.where('word IN (:...words)', { words: wordsToDelete })
			.execute();
	});

	it('debería devolver una palabra aleatoria', async () => {
		// Insertar palabras de prueba en la base de datos
		const dictionaryRepository = getRepository(Dictionary);

		await dictionaryRepository.save(words);

		// Insertar usuarios de prueba en la base de datos
		const userRepository = getRepository(User);
		const users = [{ username: 'user1' }, { username: 'user2' }];
		await userRepository.save(users);

		// Hacer una solicitud HTTP GET a la ruta /random-word
		const response = await request(app).get('/random-word');

		// Verificar que el código de estado sea 200
		expect(response.status).toBe(200);

		// Verificar que la respuesta sea un objeto JSON que contiene una propiedad 'word'
		expect(response.body).toHaveProperty('word');
	});
});
