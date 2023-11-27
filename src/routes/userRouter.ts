import {Router} from 'express'
const userRouter = Router()

import userController from '@controllers/userController'
import { userSchemaGetNumber, userSchemaPostLogin, userSchemaPostRegistration, validate } from '@validations/index'
import { AuthMiddleware } from '@middlewares/AuthMiddleware'

// const AuthMiddleware = require('../middleware/AuthMiddleware')

userRouter.get('/number/:number', AuthMiddleware, validate(userSchemaGetNumber), userController.showMeNumber)
userRouter.post('/registration', validate(userSchemaPostRegistration), userController.registration)
userRouter.post('/login', validate(userSchemaPostLogin), userController.login)
userRouter.get('/refreshToken', userController.refreshToken)

// router.post('/login', userController.login)
// router.get('/logout', userController.logout)
// router.get('/activate/:link', userController.activate)
// router.get('/refresh', userController.refresh)

// router.get('/checkEmail/:email', userController.checkEmail)

// router.get('/checkUsername/:username', userController.checkUsername)
// router.get('/users', AuthMiddleware, userController.getUsers)

export default userRouter
