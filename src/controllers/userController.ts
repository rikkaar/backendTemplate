import UserService from '@services/UserService'
import {LoginPayload, NumberPayload, RegistrationPayload} from '@validations/index'
import {maxAge} from '@consts/index'
import {NextFunction, Request, Response} from 'express'
import TokenService from '@services/TokenService'
import ApiError from '@errors/ApiError'
import {prisma} from '@ORM/prisma'

class UserController {
	async showMeNumber(req: Request<NumberPayload['params']>, res: Response, next: NextFunction) {
		try {
			const {number} = req.params
			const numberResponse = await UserService.showMeNumber(number)
			res.json(numberResponse)
		} catch (e) {
			next(e)
		}
	}

	// Мы уже будем считаться залогинеными
	async registration(req: Request<{}, {}, RegistrationPayload['body']>, res: Response, next: NextFunction) {
		try {
			let {email, password, username, role} = req.body
			const user = await UserService.registration({username, email, password, role})
			res.cookie('refreshToken', user.tokens.refreshToken, {
				path: '/api/',
				secure: true,
				maxAge: maxAge,
				httpOnly: true,
			})
			res.json(user)
		} catch (e) {
			next(e)
		}
	}

	async login(req: Request<{}, {}, LoginPayload['body']>, res: Response, next: NextFunction) {
		try {
			const {email, username, password} = req.body

			const user = await UserService.login({email, username, password})
			res.cookie('refreshToken', user.tokens.refreshToken, {
				path: '/api/',
				secure: true,
				maxAge: maxAge,
				httpOnly: true,
			})
			res.json(user)
		} catch (e) {
			next(e)
		}
	}

	async refreshToken(req: Request, res: Response, next: NextFunction) {
		try {
			const {refreshToken} = req.cookies
			if (!refreshToken) return next(ApiError.unauthorized('invalidToken', "У вас нет RefreshToken'a!"))
			const tokens = await TokenService.refreshTokens(refreshToken)

			res.cookie('refreshToken', tokens.refreshToken, {
				path: '/api/',
				secure: true,
				maxAge: maxAge,
				httpOnly: true,
			})
			res.json(tokens)
		} catch (e) {
			next(e)
		}
	}

	// async logout(req, res, next) {
	//     try {
	//         const {refreshToken} = req.cookies
	//         await UserService.logout(refreshToken)
	//         res.clearCookie('refreshToken')
	//         return res.json({message: "ok"})
	//     } catch (e) {
	//         next(e)
	//     }
	// }

	// async checkEmail(req, res, next) {
	//     try {
	//         const {email} = req.params
	//         res.json(await UserService.isEmailValid(email))
	//     } catch (e) {
	//         next(e)
	//     }
	// }

	// async checkUsername(req, res, next) {
	//     try {
	//         const {username} = req.params
	//         res.json(await UserService.isUsernameValid(username))
	//     } catch (e) {
	//         next(e)
	//     }
	// }

	// async activate(req, res, next) {
	//     try {
	//         const {link} = req.params
	//         await UserService.activate(link)
	//         return res.json({message: true})
	//     } catch (e) {
	//         next(e)
	//     }
	// }

	// async refresh(req, res, next) {
	//     try {
	//         const {refreshToken} = req.cookies
	//         if (!refreshToken) {
	//             next(ApiError.unauthorized("invalidToken", "Токен обновления невалиден"))
	//         }
	//         const tokens = await UserService.refresh(refreshToken)
	//         await res.cookie('refreshToken', tokens.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})

	//         return res.json(tokens)
	//     } catch (e) {
	//         next(e)
	//     }
	// }

	// async getUsers(req, res, next) {
	//     try {
	//         return res.json({message: "HELLO!"})
	//     } catch (e) {
	//         next(e)
	//     }
	// }
}

export default new UserController()
