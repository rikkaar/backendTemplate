import ApiError from '@errors/ApiError'
import {Request, Response, NextFunction} from 'express'
import {AnyZodObject} from 'zod'

export const validate = (schema: AnyZodObject) => async (req: Request<any>, res: Response, next: NextFunction) => {
	const parsed = await schema.safeParseAsync({
		body: req.body,
		query: req.query,
		params: req.params,
	})

	if (!parsed.success) return next(ApiError.validationError(parsed.error.issues))

	req.body = parsed.data?.body || {}
	req.query = parsed.data?.query || {}
	req.params = parsed.data?.params || {}

	return next()
}
