import {z} from 'zod'
import {buildEnvProxy} from './buildEnvProxy'
import dotenv from "dotenv"
import path from 'path'

// Явное указание на .env файл. Подключение env производится из этого файла
dotenv.config({path: path.resolve(process.cwd(), 'src/env/.env')})

const ENVBase = buildEnvProxy<Record<string, unknown>>(process.env, (key) => key)


// Создание схемы валидации Env файла
export const envSchema = z.object({
	DATABASE_URL: z.coerce.string(),
	PORT: z.coerce.number(),
	SECRET_KEY: z.coerce.string(),
	JWT_ACCESS_KEY: z.coerce.string(),
	JWT_REFRESH_KEY: z.coerce.string(),
})

// Функция для проверки ENV
export const parseEnv = (configObj: Record<string, unknown>) => {

	const parseResult = envSchema.safeParse(configObj)

	if (!parseResult.success) throw parseResult.error

	return parseResult.data
}

export const ENV = parseEnv(ENVBase)
export type ENV = typeof ENV
