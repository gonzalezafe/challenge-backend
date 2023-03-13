import { getRepository } from 'typeorm';
import { User } from './models/User';

export async function createUser() {
	const newUser = new User();
	newUser.username = 'fran';

	const userRepository = getRepository(User);
	await userRepository.save(newUser);
}
