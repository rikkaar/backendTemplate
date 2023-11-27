import { Roles } from "@prisma/client";

// what is encapsulated in authorization token
export interface UserJWT {
    id: number
    username: string
    role: Roles
}

//JWT tokens
export interface JWTTokens {
    refreshToken: string
    accessToken: string
}