import { loginHelper } from '../services/helpers/loginHelper';
import { Request, Response } from 'express';

export const loginController = (_req: Request, res: Response) => {
	try {
		//obtendria la información del req para enviarla al Helper y validarla

		const token = loginHelper();

		// Enviamos el token como respuesta
		if (token) {
			res.status(200).json({ token });
		} else {
			// Si el helper no devuelve un token, enviar una respuesta de error
			res.status(401).json({ message: 'Credenciales inválidas' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
