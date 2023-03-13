/*
import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import ServiceDb from './config/database';
import createDictionary from './createDictionary';
import randomWord from './routes/getRandomWord';
import { createUser } from './createUser';

const PORT = process.env.PORT || 8001;

async function start() {
	try {
		await ServiceDb();
		console.log('Database connected');
		//await createDictionary();
		//await createUser();
	} catch (err) {
		console.error('error server.ts', err);
	}

	const app: Application = express();

	dotenv.config();

	app.use(express.json());
	app.get('/ping', (_req, res) => {
		console.log('someone pinged here');
		res.send('pong');
	});

	app.use('/', randomWord);

	app.listen(PORT, () => {
		console.log('Server is running on port', PORT);
	});
}

const app = start();

export default app;
*/

import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import ServiceDb from './config/database';
import createDictionary from './createDictionary';
import randomWord from './routes/getRandomWord';
import { createUser } from './createUser';
import verifyWord from './routes/verifyWord';
import login from './routes/login';
import userStats from './routes/getUserStats';
const PORT = process.env.PORT || 8001;

const app: Application = express(); // Declarar app en el ámbito global

async function start() {
	try {
		await ServiceDb();
		console.log('Database connected');
		//await createDictionary();
		//await createUser();
	} catch (err) {
		console.error('error server.ts', err);
	}

	dotenv.config();

	app.use(express.json());
	app.get('/ping', (_req, res) => {
		console.log('someone pinged here');
		res.send('pong');
	});

	app.use('/', randomWord);
	app.use('/', verifyWord);
	app.use('/', login);
	app.use('/', userStats);

	app.listen(PORT, () => {
		console.log('Server is running on port', PORT);
	});
}

start(); // Llamar a la función start para iniciar el servidor

export default app; // Exportar la instancia de app
