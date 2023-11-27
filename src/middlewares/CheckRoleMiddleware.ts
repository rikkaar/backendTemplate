import jwt from 'jsonwebtoken'
import ApiError from '@errors/ApiError'
import {ENV} from '@env/index'
import {Roles, RolesAccess, UserJWT} from '@validations/apiValidations'
import {NextFunction, Request, Response} from 'express'

module.exports = function (role: Roles) {
	return function (req: Request, res: Response, next: NextFunction) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			// Check if we have something in authorization header
			const token = req?.headers?.authorization
			// If not, User is not authorized
			if (!token) {
				return next(ApiError.unauthorized('UserUnauthorized', 'User is not authorized'))
			}
			// Otherwise we need to check what inside and compare to roles and allowed access
			const decodedUserJWT = <UserJWT>jwt.verify(token.split(' ')[1], ENV.SECRET_KEY)
			if (RolesAccess[role].includes(decodedUserJWT.role)) {
				return next(ApiError.acessDenied("You don't have permittion to access this page"))
			}
			req.user = decodedUserJWT
			next()
		} catch (e) {
			next(ApiError.unauthorized('UserUnauthorized', 'User is not authorized'))
		}
	}
}
