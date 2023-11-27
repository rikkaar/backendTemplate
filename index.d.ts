// globally extend Request interface to allow userdata to be parsed from JWT

import {Express} from 'express-serve-static-core'

declare module 'express-serve-static-core' {
	interface Request {
		user: UserJWT
	}
}

// declare namespace Express {
// 	export interface Request {
// 	   user?: UserJWT
// 	}
//  }

// declare global {
// 	namespace Express {
// 		interface Request {
// 			user?: UserJWT
// 		}
// 	}
// }
