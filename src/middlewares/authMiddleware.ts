import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		res.status(401).send('No se proporcionó un token');
		return;
	}

	try {
		jwt.verify(String(token), String(process.env.AUTH_PASS));
		console.log('tokenApp', String(token));
		console.log('tokenENv', String(process.env.AUTH_PASS));
		next(); // El token es válido, permite que la solicitud continúe hacia el controlador
	} catch (err) {
		console.error(err); // Imprimir el error en la consola para obtener más información sobre el problema
		res.status(401).send('Token no válido');
	}
};

export default authMiddleware;
