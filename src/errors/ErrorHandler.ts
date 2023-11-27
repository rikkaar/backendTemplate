import ApiError from './ApiError'

export function errorHandler(err: any, req: any, res: any, next: any) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({name: err.name, message: err.message, errors: err.errors})
	}
	return res.status(500).json({name: err.name, message: err.message})
}
