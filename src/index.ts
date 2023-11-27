import {ENV} from './env'
import express, {json, Express, Request, Response} from 'express'
import cors from 'cors'

import router from './routes'
import {errorHandler} from './errors/ErrorHandler'
import cookieParser from 'cookie-parser'

// const models = require('./models/models')
// const cookieParser = require('cookie-parser')
// const fileUpload = require('express-fileupload')
// const ErrorHandler = require('./middleware/ErrorHandlingMiddleware')



const app = express()


app.use(json())
app.use(cors())
app.use(cookieParser())

// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.get('/', (req: Request, res: Response) => {
	res.send('hello world')
})
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
	try {
		app.listen(ENV.PORT, () => console.log(`Server started on port ${ENV.PORT}`))
	} catch (e: any) {
		console.log(e.message)
	}
}

start()
