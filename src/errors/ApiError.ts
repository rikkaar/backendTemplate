interface ApiError {
	status: number
	name: string
	message: string
	errors: any[]
}

class ApiError extends Error {
	constructor(status: number, name: string, message: string, errors: any[] = []) {
		super()
		this.status = status
		this.name = name
		this.message = message
		this.errors = errors
	}

	static badRequest(name: string, message: string, errors?: any[]) {
		return new ApiError(400, name, message, errors)
	}

	static validationError(errors?: any[]) {
		return new ApiError(403, 'ValidationErrors', "Validation didn't pass", errors)
	}

	static unauthorized(name: string, message: string, errors?: any[]) {
		return new ApiError(401, name, message, errors)
	}

	static acessDenied(message: string, errors?: any[]) {
		return new ApiError(401, "acessDenied", message, errors)
	}

	static internal(name: string, message: string, errors?: any[]) {
		return new ApiError(500, name, message, errors)
	}
	
	static forbidden(name: string, message: string, errors?: any[]) {
		return new ApiError(403, name, message, errors)
	}
}

export default ApiError
