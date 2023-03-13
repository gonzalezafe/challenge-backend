import { createConnection } from 'typeorm';
import { CurrentGame } from '../models/CurrentGame';
import { Dictionary } from '../models/dictionary';
import { GameResult } from '../models/GameResult';
import { User } from '../models/User';

export default async () => {
	await createConnection({
		type: 'postgres',
		host: process.env.POSTGRES_HOST || '127.0.0.1',
		port: Number(process.env.POSTGRES_PORT) || 8002,
		username: process.env.POSTGRES_USER || 'postgres',
		password: process.env.POSTGRES_PASSWORD || 'postgres',
		database: process.env.POSTGRES_DB || 'challenge-ts',
		entities: [Dictionary, User, CurrentGame, GameResult],
		synchronize: true,
	});
};
