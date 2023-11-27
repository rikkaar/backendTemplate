import ApiError from '@errors/ApiError'
import TokenService from '@services/TokenService'
import {NextFunction, Response, Request} from 'express'

export async function AuthMiddleware(req: Request<any>, res: Response, next: NextFunction) {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		let token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return next(ApiError.unauthorized('UserUnAuthorized', 'Пользователь не авторизован'))
		}
		req.user = TokenService.validateAccessToken(token)
		next()
	} catch (e) {
		return next(ApiError.unauthorized('UserUnAuthorized', 'Пользователь не авторизован'))
	}
}
