import {z} from 'zod'
import { Roles } from "@prisma/client";

export interface NumberPayload {
	params: {
		number: number
	}
}

export const userSchemaGetNumber = z.object({
	params: z.object({
		number: z.coerce.number().nonnegative(),
	}),
})


export interface LoginPayload {
	body: {
		email?: string,
		username?: string,
		password: string
	}
}

export const userSchemaPostLogin = z.object({
	body: z.object({
		email: z.string().email().optional(),
		username: z.string().optional(),
		password: z.string().min(5),
		role: z.nativeEnum(Roles).optional().default(Roles.user)
	})
})

export interface RegistrationPayload {
	body: {
		email: string,
		username: string,
		password: string,
		role: Roles
	}
}

export const userSchemaPostRegistration = z.object({
	body: z.object({
		email: z.string().email(),
		username: z.string(),
		password: z.string().min(5),
		role: z.nativeEnum(Roles).optional().default(Roles.user)
	})
})
