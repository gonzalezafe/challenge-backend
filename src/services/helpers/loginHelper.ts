import jwt from 'jsonwebtoken';

export const loginHelper = () => {
	// Aquí obtendrías las credenciales del usuario y las validarías

	// Si las credenciales son válidas, generamos el token
	const payload = {
		username: 'fran',
		role: 'user',
	};
	const token = jwt.sign(payload, String(process.env.AUTH_PASS), { expiresIn: '1d' });

	return token;
};
