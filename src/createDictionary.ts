import { getConnection } from 'typeorm';
import * as fs from 'fs';
import axios from 'axios';
import { Dictionary } from './models/dictionary';

export default () => {
	const words = fs
		.readFileSync('/home/franco/Documentos/backend/challenge-backend/dictionary.txt')
		.toString()
		.split('\n');

	console.log('leo diccionario');

	const wordRepository = getConnection().getRepository(Dictionary);

	words.forEach(async (word) => {
		const newWord = wordRepository.create({ word: word });
		await wordRepository.save(newWord);
	});

	console.log('Words saved to database');
};
