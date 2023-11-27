// const {User} = require('../models/models')
// const bcrypt = require('bcrypt')
// const uuid = require('uuid')
// const MailService = require('./mail-service.js')
// const TokenService = require('./token-service')
// const { param } = require('express-validator');

import {prisma} from '@ORM/prisma'
import ApiError from '@errors/ApiError'
import {JWTTokens, UserJWT} from '@validations/index'
import {LoginPayload, RegistrationPayload} from '@validations/userValidations'
import bcrypt from 'bcrypt'
import TokenService from '@services/TokenService'

class UserService {
	async showMeNumber(number: number) {
		return `Your number us ${number}!`
	}

	async registration({username, email, password, role}: RegistrationPayload['body']) {
		// those functions throws errors if not passed
		await this.isEmailAvailable(email)
		await this.isUsernameAvailable(username)

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hashPassword,
				role,
			},
		})
		// await MailService.sendActivationMail(email)

		const tokens = TokenService.generateTokens({id: user.id, username, role})
		await TokenService.saveToken(user.id, tokens.refreshToken)

		// return {...tokens, id: user.id, userData: {user: user.username, email: user.email, role: user.role}}
		return {tokens, userData: <UserJWT>{id: user.id, username: user.username, role: user.role}}
	}

	async isUsernameAvailable(username: string) {
		const isUsernameTaken = await prisma.user.findUnique({
			where: {
				username,
			},
		})
		if (isUsernameTaken) {
			throw ApiError.forbidden('UsernameTaken', 'username уже занят')
		} else return true
	}

	async isEmailAvailable(email: string) {
		const isEmailTaken = await prisma.user.findUnique({
			where: {
				email,
			},
		})
		if (isEmailTaken) {
			throw ApiError.forbidden('UserAlreadyExist', 'Почта уже использована')
		} else return true
	}

	async login({email, username, password}: LoginPayload['body']) {
		const loginField = Object.fromEntries(
			Object.entries({email, username}).filter((key) => {
				if (key !== undefined && key[1] !== undefined) {
					return key[1]
				}
			})
		)
	    const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						username
					},
					{
						email
					}
				]
			}
		})
	    if (!user) {
	        throw ApiError.badRequest("UserDoesntExist", "Такого пользователя не существует")
	    }
	    // if (!user.isActivated) {
	    //     throw ApiError.unauthorized("UserIsNotActivated", "Пользователь не зарегистрирован")
	    // }
	    const tokens = TokenService.generateTokens({
			id: user.id,
			username: user.username,
			role: user.role
	    })
	    const newtoken = await TokenService.saveToken(user.id, tokens.refreshToken)
		console.log(newtoken)

	    if (!bcrypt.compareSync(password, user.password)) {
	        throw ApiError.internal("WrongPassword", "Пароль неверен")
	    }
		return {tokens, userData: <UserJWT>{id: user.id, username: user.username, role: user.role}}
	}

	// async activate(activationLink) {
	//     const user = await User.findOne({where: {activationLink}})
	//     if (!user) {
	//         throw ApiError.badRequest("invalidEndPoint", "Некорректная ссылка активации")
	//     }
	//     if (!user.isActivated) {
	//         await user.update({isActivated: true})
	//     } // если ничего не крашится, значит по валидирующей сслыке прошел пользователь (любой)
	// }

	// async logout(refreshToken) {
	//     await TokenService.deleteRefreshToken(refreshToken)
	// }

	// async refresh(refreshToken) {
	//     const userData = TokenService.validateRefreshToken(refreshToken)
	//     const token = await TokenService.findToken(refreshToken)
	//     if (token) {
	//         const user = await User.findByPk(userData.id)
	//         const tokens = TokenService.generateTokens({
	//             id: user.id,
	//             username: user.username,
	//             email: user.email,
	//             role: user.role
	//         })
	//         await TokenService.saveToken(user.id, tokens.refreshToken)
	//         await TokenService.deleteRefreshToken(token.refreshToken)
	//         return tokens
	//     } else {
	//         throw ApiError.unauthorized("TokenDoesntExist", "Токена нет в бд. Перелогиньтесь")
	//     }
	// }
}

export default new UserService()
