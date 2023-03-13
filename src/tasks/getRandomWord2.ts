import { getConnection, getRepository } from 'typeorm';
import { Dictionary } from '../models/dictionary';

// Función para obtener una palabra aleatoria de la base de datos
export async function getRandomWord(): Promise<string> {
	// Obtener el repositorio para la entidad "Word"
	const wordRepository = getConnection().getRepository(Dictionary);

	// Obtener todas las palabras de la base de datos
	const words = await wordRepository.find();

	// Seleccionar una palabra aleatoria
	const randomIndex = Math.floor(Math.random() * words.length);
	const randomWord = words[randomIndex].word;

	return randomWord;
}
