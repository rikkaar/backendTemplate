import jwt, { TokenExpiredError } from 'jsonwebtoken'
import {ENV} from '@env/index'
import {JWTTokens, UserJWT} from '@validations/index'
import ApiError from '@errors/ApiError'
import {prisma} from '@ORM/prisma'
import { maxAge } from '@consts/index'
import { randomUUID } from 'crypto'

class TokenService {
	generateAccessToken(payload: UserJWT) {
		return jwt.sign(payload, ENV.JWT_ACCESS_KEY, {
			expiresIn: '30s',
		})
	}

	generateRefreshToken() {
		return randomUUID()
	}
	// generateRefreshToken(payload: UserJWT) {
	// 	return jwt.sign(payload, ENV.JWT_REFRESH_KEY, {
	// 		expiresIn: `180s`,
	// 		// expiresIn: `${maxAge}ms`,
	// 	})
	// }

	generateTokens(payload: UserJWT) {
		return <JWTTokens> {
			accessToken: this.generateAccessToken(payload),
			refreshToken: this.generateRefreshToken(),
		}
	}

	// async saveToken(userId, refreshToken, prev) {
	//     if (prev) {
	//         const candidate = await Token.findOne({where: {userId, refreshToken: prev}})
	//         if (!candidate) return await Token.create({userId, refreshToken})

	//         candidate.refreshToken = refreshToken
	//         return await candidate.save()
	//     }
	// }

	async refreshTokens(refreshToken: string) {
		// Если токена нет в БД, то выкидываем ошибку
		const token = await prisma.token.findFirst({
			where: {
				refreshToken,
			},
		})
		if (!token) {
			throw ApiError.unauthorized('TokenDoesntExists', 'Нечего обновлять. Его нет в БД')
		} 
		// Если токен просрочен
		else if (token.expiresAt <= new Date(Date.now())) {
			throw ApiError.unauthorized('TokenExpired', "Токен просрочен")
		}

		
		// Получаем инфу о пользователе, который привязан к рефрешу, который мы обновляем
		const user = await prisma.user.findFirstOrThrow({
			where: {
				id: token.userId
			}
		})

		const tokens = this.generateTokens({
			id: user.id,
			username: user.username,
			role: user.role,
		})

		await prisma.token.update({
			where: {
				id: token?.id,
			},
			data: {
				refreshToken: tokens.refreshToken,
				expiresAt: new Date(Date.now() + maxAge),
				createdAt: new Date(Date.now())
			}
		})

		return tokens
	}

	async saveToken(userId: number, refreshToken: string) {
		return await prisma.token.create({
			data: {
				refreshToken,	
				userId,
				expiresAt: new Date(Date.now() + maxAge)
			},
		})
	}

	async deleteRefreshToken(refreshToken: string) {
		return await prisma.token.delete({
			where: {
				refreshToken,
			},
		})
	}

	validateAccessToken(token: string) {
		try {
			return <UserJWT>jwt.verify(token, ENV.JWT_ACCESS_KEY)
		} catch (e) {
			if (e instanceof TokenExpiredError) {
				null
			}
			throw ApiError.unauthorized('invalidToken', 'AccessToken не прошел проверку')
		}
	}

	// validateRefreshToken(token: string) {
	// 	try {
	// 		return <UserJWT>jwt.verify(token, ENV.JWT_REFRESH_KEY)
	// 	} catch (e) {
	// 		if (e instanceof TokenExpiredError) {
	// 			throw ApiError.unauthorized('tokenTimedOut', 'RefreshToken просрочен')
	// 		}
	// 		throw ApiError.unauthorized('invalidToken', 'RefreshToken не прошел проверку')
	// 	}
	// }

	async findToken(refreshToken: string) {
		return await prisma.token.findFirst({
            where: {
                refreshToken
            }
        })
	}
}

export default new TokenService()
